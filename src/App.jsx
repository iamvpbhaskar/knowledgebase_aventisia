// src/App.jsx
import React, { useEffect, useMemo, useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import MainContent from './components/MainContent';
import CreateKBModal from './components/CreateKBModal';
import './App.css';

export default function App() {
  const [modalState, setModalState] = useState({ isOpen: false, mode: 'create', editingKbId: null });
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [knowledgeBases, setKnowledgeBases] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const openCreateModal = () => setModalState({ isOpen: true, mode: 'create', editingKbId: null });
  const openEditModal = (kbId) => setModalState({ isOpen: true, mode: 'edit', editingKbId: kbId });
  const closeModal = () => setModalState({ isOpen: false, mode: 'create', editingKbId: null });

  /**
   * Handle creation of new Knowledge Base
   * @param {Object} formData - Form data from CreateKBModal
   */
  const handleCreateKB = (formData) => {
    const newKB = {
      id: Math.max(0, ...knowledgeBases.map((kb) => kb.id)) + 1,
      title: formData.name || 'New KB',
      description: formData.description || '',
      vectorStore: formData.vectorStore || 'Qdrant',
      llmModel: formData.llmModel || 'text-embedding-ada-002',
      createdOn: new Date().toLocaleDateString('en-GB'),
      pinned: false,
    };
    setKnowledgeBases([newKB, ...knowledgeBases]);
    setCurrentPage(1);
    closeModal();
  };

  const handleUpdateKB = (formData) => {
    const editingKbId = modalState.editingKbId;
    if (!editingKbId) return;

    setKnowledgeBases((prev) =>
      prev.map((kb) =>
        kb.id === editingKbId
          ? {
              ...kb,
              description: formData.description ?? kb.description,
              vectorStore: formData.vectorStore ?? kb.vectorStore,
              llmModel: formData.llmModel ?? kb.llmModel,
            }
          : kb,
      ),
    );
    closeModal();
  };

  const handleDeleteKB = (kbId) => {
    setKnowledgeBases((prev) => prev.filter((kb) => kb.id !== kbId));
  };

  const handleTogglePin = (kbId) => {
    setKnowledgeBases((prev) =>
      prev.map((kb) => (kb.id === kbId ? { ...kb, pinned: !kb.pinned } : kb)),
    );
  };

  const sortedKnowledgeBases = useMemo(() => {
    return [...knowledgeBases].sort((a, b) => {
      const pinnedDiff = (b.pinned ? 1 : 0) - (a.pinned ? 1 : 0);
      if (pinnedDiff !== 0) return pinnedDiff;
      return b.id - a.id; // newest first
    });
  }, [knowledgeBases]);

  const filteredKnowledgeBases = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return sortedKnowledgeBases;
    return sortedKnowledgeBases.filter((kb) => (kb.title ?? '').toLowerCase().includes(q));
  }, [sortedKnowledgeBases, searchQuery]);

  const totalRows = filteredKnowledgeBases.length;
  const totalPages = Math.max(1, Math.ceil(totalRows / rowsPerPage));

  useEffect(() => {
    setCurrentPage((prev) => Math.min(prev, totalPages));
  }, [totalPages]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  const paginatedKnowledgeBases = useMemo(() => {
    const safePage = Math.min(Math.max(1, currentPage), totalPages);
    const startIndex = (safePage - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    return filteredKnowledgeBases.slice(startIndex, endIndex);
  }, [filteredKnowledgeBases, currentPage, rowsPerPage, totalPages]);

  const editingKb =
    modalState.editingKbId != null
      ? knowledgeBases.find((kb) => kb.id === modalState.editingKbId) ?? null
      : null;

  return (
    <div className="h-screen bg-white p-2">
      <div className="h-full min-h-0 flex flex-col gap-2">
        {/* TOP BAR (INSET + ROUNDED) */}
        <Header
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          sidebarOpen={sidebarOpen}
          onToggleSidebar={() => setSidebarOpen((v) => !v)}
        />

        <div className="flex flex-1 min-h-0 overflow-hidden">
          {/* SIDEBAR NAVIGATION */}
          <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

          {/* PAGE CONTENT */}
          <MainContent
            knowledgeBases={paginatedKnowledgeBases}
            totalRows={totalRows}
            currentPage={currentPage}
            totalPages={totalPages}
            rowsPerPage={rowsPerPage}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            onCreateClick={openCreateModal}
            onEditClick={(kb) => openEditModal(kb.id)}
            onDeleteClick={(kb) => handleDeleteKB(kb.id)}
            onTogglePin={(kb) => handleTogglePin(kb.id)}
            onRowsPerPageChange={(value) => {
              setRowsPerPage(value);
              setCurrentPage(1);
            }}
            onPageChange={setCurrentPage}
          />
        </div>

        {/* CREATE KB MODAL */}
        {modalState.isOpen && (
          <CreateKBModal
            mode={modalState.mode}
            initialValues={editingKb}
            onClose={closeModal}
            onSubmit={modalState.mode === 'edit' ? handleUpdateKB : handleCreateKB}
          />
        )}
      </div>
    </div>
  );
}
