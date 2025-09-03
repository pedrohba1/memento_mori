'use client';
import '@/styles/tiptap.scss';

import { use, useEffect, useState } from 'react';
import { Editor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { getItem, setItem } from '@/lib/indexedDb';

import Highlight from '@tiptap/extension-highlight';
import Typography from '@tiptap/extension-typography';
import { useI18n } from '@/i18n';

type PageProps = {
  params: Promise<{ week: string }>;
};

export default function WeekPage({ params }: PageProps) {
  const { week } = use(params); // unwrap Promise
  const weekNumber = Number(week);
  const storageKey = `week-${weekNumber}`;

  const { t } = useI18n();

  const [editor, setEditor] = useState<Editor | null>(null);

  useEffect(() => {
    const init = async () => {
      const content = await getItem(storageKey);

      const newEditor = new Editor({
        extensions: [StarterKit, Highlight, Typography],
        content: content || '',
        onUpdate({ editor }) {
          const json = editor.getJSON();
          setItem(storageKey, json);

          // Update writtenWeeks index
          getItem('writtenWeeks').then((written: number[] = []) => {
            const updated = new Set(written);
            updated.add(weekNumber);
            setItem('writtenWeeks', Array.from(updated));
          });
        },
      });

      setEditor(newEditor);
    };

    init();
  }, [storageKey]);

  return (
    <div className="min-h-screen px-6 py-8">
      {/* Top-left header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold">{t('week.title', { weekNumber })}</h1>
      </div>

      {/* Centered editor */}
      <div className="w-full flex justify-center">
        <div className="w-full max-w-3xl px-4">
          {editor && <EditorContent editor={editor} className="tiptap" />}
        </div>
      </div>
    </div>
  );
}
