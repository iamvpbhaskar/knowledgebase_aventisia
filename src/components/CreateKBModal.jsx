// src/components/CreateKBModal.jsx
import React, { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import Dropdown from './Dropdown';

export default function CreateKBModal({ mode = 'create', initialValues, onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    vectorStore: 'Qdrant',
    llmModel: 'text-embedding-ada-002',
  });
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    if (mode === 'edit' && initialValues) {
      setFormData({
        name: initialValues.title ?? '',
        description: initialValues.description ?? '',
        vectorStore: initialValues.vectorStore ?? 'Qdrant',
        llmModel: initialValues.llmModel ?? 'text-embedding-ada-002',
      });
      setShowError(false);
      return;
    }

    setFormData({
      name: '',
      description: '',
      vectorStore: 'Qdrant',
      llmModel: 'text-embedding-ada-002',
    });
    setShowError(false);
  }, [mode, initialValues]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (name === 'name') setShowError(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name.trim()) {
      onSubmit(formData);
      setShowError(false);
    } else {
      setShowError(true);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center sm:items-stretch sm:justify-end p-3 sm:p-0">
      {/* DIMMED / BLURRED BACKDROP */}
      <button
        type="button"
        aria-label="Close modal"
        onClick={onClose}
        className="absolute inset-0 bg-black/35 backdrop-blur-[2px] animate-overlayFade cursor-default"
      />

      {/* DRAWER (DESKTOP) / CENTERED MODAL (MOBILE) */}
      <div className="relative z-10 w-full max-w-[420px] h-[78vh] sm:h-full bg-white shadow-2xl border border-gray-200 sm:border-y-0 sm:border-r-0 sm:border-l rounded-2xl sm:rounded-none overflow-hidden animate-drawerIn">
        <form onSubmit={handleSubmit} className="h-full flex flex-col">
          {/* HEADER */}
          <div className="px-6 pt-6 pb-4">
            <div className="flex items-start justify-between gap-6">
              <div>
                <h2 className="text-sm font-semibold text-gray-900">
                  {mode === 'edit' ? 'Edit Knowledge Base' : 'Create New Knowledge Base'}
                </h2>
                <p className="mt-1 text-xs text-gray-500">
                  Best for quick answers from documents, websites and text files.
                </p>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="p-1 text-gray-400 hover:text-gray-600 transition"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          {/* BODY */}
          <div className="px-6 py-5 overflow-auto">
            <div className="space-y-5">
              {/* NAME FIELD */}
              <div>
                <label className="block text-[11px] font-semibold text-gray-700 mb-2">
                  Name (Cannot be edited later)<span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={formData.name}
                  onChange={handleChange}
                  disabled={mode === 'edit'}
                  className={`w-full h-10 px-3 border rounded-md text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 ${
                    showError ? 'border-red-300 focus:ring-red-200' : 'border-gray-200 focus:ring-[#4F46E5]/20 focus:border-[#4F46E5]'
                  } ${mode === 'edit' ? 'bg-gray-50 cursor-not-allowed' : 'bg-white'}`}
                />
                {showError && (
                  <p className="mt-1 text-xs text-red-500">Name is required.</p>
                )}
              </div>

              {/* DESCRIPTION FIELD */}
              <div>
                <label className="block text-[11px] font-semibold text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  name="description"
                  placeholder="Description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="4"
                  className="w-full px-3 py-2 border border-gray-200 rounded-md text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#4F46E5]/20 focus:border-[#4F46E5] resize-none"
                />
              </div>

              {/* VECTOR STORE */}
              <div>
                <label className="block text-[11px] font-semibold text-gray-700 mb-2">
                  Vector Store<span className="text-red-500">*</span>
                </label>
                <Dropdown
                  value={formData.vectorStore}
                  onChange={(v) => setFormData((prev) => ({ ...prev, vectorStore: String(v) }))}
                  placement="bottom"
                  widthClassName="w-full"
                  portal
                  buttonClassName="w-full h-10 px-3 border border-gray-200 rounded-md text-sm text-gray-900 bg-white hover:bg-gray-50 transition"
                  options={[
                    { value: 'Qdrant', label: 'Qdrant' },
                    { value: 'Pinecone', label: 'Pinecone' },
                    { value: 'Weaviate', label: 'Weaviate' },
                  ]}
                />
              </div>

              {/* LLM EMBEDDING MODEL */}
              <div>
                <label className="block text-[11px] font-semibold text-gray-700 mb-2">
                  LLM Embedding Model<span className="text-red-500">*</span>
                </label>
                <Dropdown
                  value={formData.llmModel}
                  onChange={(v) => setFormData((prev) => ({ ...prev, llmModel: String(v) }))}
                  placement="bottom"
                  widthClassName="w-full"
                  portal
                  buttonClassName="w-full h-10 px-3 border border-gray-200 rounded-md text-sm text-gray-900 bg-white hover:bg-gray-50 transition"
                  options={[
                    { value: 'text-embedding-ada-002', label: 'text-embedding-ada-002' },
                    { value: 'text-embedding-3-small', label: 'text-embedding-3-small' },
                    { value: 'text-embedding-3-large', label: 'text-embedding-3-large' },
                  ]}
                />
              </div>
            </div>
          </div>

          {/* FOOTER */}
          <div className="mt-auto px-6 py-5">
            <div className="flex justify-center sm:justify-end">
              <button
                type="submit"
                className="h-9 px-6 bg-[#4F46E5] hover:bg-[#4338CA] text-white text-sm font-medium rounded-lg shadow-sm transition"
              >
                {mode === 'edit' ? 'Save' : 'Create'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
