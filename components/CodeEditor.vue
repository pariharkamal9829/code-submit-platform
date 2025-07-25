<template>
  <div class="relative">
    <div
      ref="editorContainer"
      class="border border-gray-300 rounded-md focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500"
      :style="{ height: height }"
    ></div>
  </div>
</template>

<script setup>
import { EditorView, basicSetup } from 'codemirror'
import { python } from '@codemirror/lang-python'
import { javascript } from '@codemirror/lang-javascript'
import { java } from '@codemirror/lang-java'
import { oneDark } from '@codemirror/theme-one-dark'
import { EditorState } from '@codemirror/state'

const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  language: {
    type: String,
    default: 'python'
  },
  height: {
    type: String,
    default: '400px'
  },
  theme: {
    type: String,
    default: 'light'
  },
  readOnly: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:modelValue'])

const editorContainer = ref(null)
let editorView = null

const getLanguageSupport = (lang) => {
  switch (lang.toLowerCase()) {
    case 'python':
      return python()
    case 'javascript':
    case 'js':
      return javascript()
    case 'java':
      return java()
    default:
      return python()
  }
}

const createEditor = () => {
  if (!editorContainer.value) return

  const extensions = [
    basicSetup,
    getLanguageSupport(props.language),
    EditorView.updateListener.of((update) => {
      if (update.docChanged) {
        const content = update.state.doc.toString()
        emit('update:modelValue', content)
      }
    }),
    EditorView.theme({
      '&': {
        fontSize: '14px',
        fontFamily: 'Monaco, "Cascadia Code", "Roboto Mono", Consolas, "Courier New", monospace'
      },
      '.cm-content': {
        padding: '16px',
        minHeight: '100%'
      },
      '.cm-focused': {
        outline: 'none'
      },
      '.cm-editor': {
        borderRadius: '6px'
      },
      '.cm-scroller': {
        fontFamily: 'inherit'
      }
    })
  ]

  // Add dark theme if requested
  if (props.theme === 'dark') {
    extensions.push(oneDark)
  }

  // Add readonly extension if needed
  if (props.readOnly) {
    extensions.push(EditorState.readOnly.of(true))
  }

  const startState = EditorState.create({
    doc: props.modelValue,
    extensions
  })

  editorView = new EditorView({
    state: startState,
    parent: editorContainer.value
  })
}

const updateContent = (newContent) => {
  if (editorView && newContent !== editorView.state.doc.toString()) {
    editorView.dispatch({
      changes: {
        from: 0,
        to: editorView.state.doc.length,
        insert: newContent
      }
    })
  }
}

// Watch for prop changes
watch(() => props.modelValue, (newValue) => {
  updateContent(newValue)
})

watch(() => props.language, () => {
  // Recreate editor with new language support
  if (editorView) {
    editorView.destroy()
    createEditor()
  }
})

watch(() => props.theme, () => {
  // Recreate editor with new theme
  if (editorView) {
    editorView.destroy()
    createEditor()
  }
})

// Lifecycle
onMounted(() => {
  nextTick(() => {
    createEditor()
  })
})

onBeforeUnmount(() => {
  if (editorView) {
    editorView.destroy()
  }
})

// Public methods
const focus = () => {
  if (editorView) {
    editorView.focus()
  }
}

const getSelection = () => {
  if (editorView) {
    const selection = editorView.state.selection.main
    return editorView.state.doc.sliceString(selection.from, selection.to)
  }
  return ''
}

const insertText = (text, position = null) => {
  if (editorView) {
    const pos = position !== null ? position : editorView.state.selection.main.head
    editorView.dispatch({
      changes: { from: pos, insert: text },
      selection: { anchor: pos + text.length }
    })
  }
}

const replaceSelection = (text) => {
  if (editorView) {
    const selection = editorView.state.selection.main
    editorView.dispatch({
      changes: { from: selection.from, to: selection.to, insert: text },
      selection: { anchor: selection.from + text.length }
    })
  }
}

// Expose methods to parent
defineExpose({
  focus,
  getSelection,
  insertText,
  replaceSelection
})
</script>

<style>
/* Additional custom styling for CodeMirror */
.cm-editor {
  background: white;
}

.cm-editor.cm-focused {
  outline: none;
}

/* Syntax highlighting customization */
.cm-content {
  caret-color: #3b82f6;
}

/* Line numbers */
.cm-lineNumbers .cm-gutterElement {
  color: #6b7280;
  font-size: 13px;
}

/* Selection */
.cm-selectionBackground {
  background: #dbeafe !important;
}

/* Matching brackets */
.cm-matchingBracket {
  background: #fef3c7;
  outline: 1px solid #f59e0b;
}

/* Search match highlighting */
.cm-searchMatch {
  background: #fef3c7;
  outline: 1px solid #f59e0b;
}

.cm-searchMatch.cm-searchMatch-selected {
  background: #fbbf24;
}

/* Error highlighting */
.cm-diagnostic-error {
  border-bottom: 2px solid #ef4444;
}

.cm-diagnostic-warning {
  border-bottom: 2px solid #f59e0b;
}

/* Tooltip styling */
.cm-tooltip {
  background: #1f2937;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 4px 8px;
  font-size: 12px;
}

/* Scrollbar styling */
.cm-scroller::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

.cm-scroller::-webkit-scrollbar-track {
  background: #f3f4f6;
}

.cm-scroller::-webkit-scrollbar-thumb {
  background: #d1d5db;
  border-radius: 4px;
}

.cm-scroller::-webkit-scrollbar-thumb:hover {
  background: #9ca3af;
}

/* Dark theme overrides */
.cm-theme-dark .cm-editor {
  background: #1f2937;
  color: #f9fafb;
}

.cm-theme-dark .cm-content {
  caret-color: #60a5fa;
}

.cm-theme-dark .cm-selectionBackground {
  background: #374151 !important;
}

.cm-theme-dark .cm-lineNumbers .cm-gutterElement {
  color: #6b7280;
}

.cm-theme-dark .cm-scroller::-webkit-scrollbar-track {
  background: #374151;
}

.cm-theme-dark .cm-scroller::-webkit-scrollbar-thumb {
  background: #4b5563;
}

.cm-theme-dark .cm-scroller::-webkit-scrollbar-thumb:hover {
  background: #6b7280;
}
</style>
