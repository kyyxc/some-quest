'use client';

import React, { useEffect, useState } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import {
    Bold,
    Italic,
    Heading1,
    Heading2,
    List,
    ListOrdered,
    Quote,
    Undo,
    Redo,
} from 'lucide-react';

type Props = {
    value?: string;
    onContentChange: (content: string) => void;
};

const MenuBar = ({ editor }: { editor: any }) => {
    if (!editor) return null;

    const buttonClass = (isActive: boolean) =>
        `p-2 rounded-sm transition duration-150 ${isActive ? 'bg-gray-200 text-blue-700' : 'bg-transparent text-gray-600'
        } hover:bg-gray-100 hover:text-gray-800`;

    return (
        <div className="flex items-center space-x-1 border-b border-gray-200 px-4 py-2">
            <button
                onClick={() => editor.chain().focus().toggleBold().run()}
                className={buttonClass(editor.isActive('bold'))}
                type="button"
            >
                <Bold size={18} />
            </button>
            <button
                onClick={() => editor.chain().focus().toggleItalic().run()}
                className={buttonClass(editor.isActive('italic'))}
                type="button"
            >
                <Italic size={18} />
            </button>
            <button
                onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                className={buttonClass(editor.isActive('heading', { level: 1 }))}
                type="button"
            >
                <Heading1 size={18} />
            </button>
            <button
                onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                className={buttonClass(editor.isActive('heading', { level: 2 }))}
                type="button"
            >
                <Heading2 size={18} />
            </button>
            <button
                onClick={() => editor.chain().focus().toggleBulletList().run()}
                className={buttonClass(editor.isActive('bulletList'))}
                type="button"
            >
                <List size={18} />
            </button>
            <button
                onClick={() => editor.chain().focus().toggleOrderedList().run()}
                className={buttonClass(editor.isActive('orderedList'))}
                type="button"
            >
                <ListOrdered size={18} />
            </button>
            <button
                onClick={() => editor.chain().focus().undo().run()}
                disabled={!editor.can().undo()}
                className={buttonClass(false)}
                type="button"
            >
                <Undo size={18} />
            </button>
            <button
                onClick={() => editor.chain().focus().redo().run()}
                disabled={!editor.can().redo()}
                className={buttonClass(false)}
                type="button"
            >
                <Redo size={18} />
            </button>
        </div>
    );
};

const TiptapEditor = ({ value = '', onContentChange }: Props) => {
    const [isEditorEmpty, setIsEditorEmpty] = useState(true);

    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                heading: {
                    levels: [1, 2],
                },
            }),
        ],
        content: value,
        onUpdate: ({ editor }) => {
            const html = editor.getHTML();
            setIsEditorEmpty(html === '<p></p>' || html.trim() === '');
            onContentChange(html);
        },
        editorProps: {
            attributes: {
                class: 'min-h-[400px] p-4 text-gray-800 focus:outline-none',
            },
        },
    });

    useEffect(() => {
        if (editor && value !== editor.getHTML()) {
            editor.commands.setContent(value || '');
        }
    }, [value]);

    return (
        <div className="border border-gray-300 rounded-md bg-white focus-within:ring-2 focus-within:ring-blue-500 transition duration-150 shadow-sm overflow-hidden relative">
            <MenuBar editor={editor} />
            <div className="relative">
                {isEditorEmpty && (
                    <div className="absolute top-0 left-0 p-4 text-gray-400 pointer-events-none">
                        Start writing your meeting notes here...
                    </div>
                )}
                <EditorContent editor={editor} />
            </div>
        </div>
    );
};

export default TiptapEditor;
