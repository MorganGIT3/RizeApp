import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Folder, 
  FolderPlus, 
  Trash2, 
  MoreVertical, 
  ArrowLeft,
  Grid,
  List,
  Search,
  Plus,
  Play,
  Camera,
  Users,
  Briefcase,
  Palette,
  Star,
  Sparkles,
  Video
} from 'lucide-react';

interface FolderItem {
  id: string;
  name: string;
  type: 'folder';
  createdAt: Date;
  parentId?: string;
  isStarred?: boolean;
  platform?: 'youtube' | 'instagram' | 'tiktok' | 'facebook' | 'linkedin' | 'resources';
}

interface ContentItem {
  id: string;
  name: string;
  type: 'content';
  platform: 'youtube' | 'instagram' | 'tiktok' | 'facebook' | 'linkedin';
  contentType: 'video' | 'reel' | 'story' | 'post' | 'article';
  title: string;
  description: string;
  thumbnail?: string;
  createdAt: Date;
  parentId: string;
  isStarred?: boolean;
  metadata?: {
    duration?: string;
    views?: number;
    likes?: number;
    status?: 'draft' | 'scheduled' | 'published';
  };
}

type Item = FolderItem | ContentItem;

export function ContentManager() {
  const [folders, setFolders] = useState<FolderItem[]>([
    // Dossiers principaux
    { id: '1', name: 'Instagram', type: 'folder', createdAt: new Date('2024-01-15'), platform: 'instagram' },
    { id: '2', name: 'YouTube', type: 'folder', createdAt: new Date('2024-01-20'), platform: 'youtube' },
    { id: '3', name: 'TikTok', type: 'folder', createdAt: new Date('2024-02-01'), platform: 'tiktok' },
    { id: '4', name: 'Facebook', type: 'folder', createdAt: new Date('2024-02-05'), platform: 'facebook' },
    { id: '5', name: 'LinkedIn', type: 'folder', createdAt: new Date('2024-02-08'), platform: 'linkedin' },
    { id: '6', name: 'Ressources', type: 'folder', createdAt: new Date('2024-02-10'), platform: 'resources' },
    
    // Sous-dossiers Instagram
    { id: '11', name: 'Reels', type: 'folder', createdAt: new Date('2024-01-16'), parentId: '1' },
    { id: '12', name: 'Stories', type: 'folder', createdAt: new Date('2024-01-17'), parentId: '1' },
    { id: '13', name: 'Posts Feed', type: 'folder', createdAt: new Date('2024-01-18'), parentId: '1' },
    { id: '111', name: 'Miniatures', type: 'folder', createdAt: new Date('2024-01-23'), parentId: '11' },
    { id: '112', name: 'Scripts', type: 'folder', createdAt: new Date('2024-01-24'), parentId: '11' },
    
    // Sous-dossiers YouTube
    { id: '21', name: 'Vidéos Longues', type: 'folder', createdAt: new Date('2024-01-21'), parentId: '2' },
    { id: '22', name: 'Shorts', type: 'folder', createdAt: new Date('2024-01-22'), parentId: '2' },
    { id: '211', name: 'Miniatures', type: 'folder', createdAt: new Date('2024-01-23'), parentId: '21' },
    { id: '212', name: 'Scripts', type: 'folder', createdAt: new Date('2024-01-24'), parentId: '21' },
    { id: '213', name: 'Intros/Outros', type: 'folder', createdAt: new Date('2024-01-25'), parentId: '21' },
    { id: '221', name: 'Miniatures', type: 'folder', createdAt: new Date('2024-01-23'), parentId: '22' },
    { id: '222', name: 'Scripts', type: 'folder', createdAt: new Date('2024-01-24'), parentId: '22' },
    
    // Sous-dossiers TikTok
    { id: '31', name: 'Vidéos', type: 'folder', createdAt: new Date('2024-02-02'), parentId: '3' },
    { id: '32', name: 'Tendances', type: 'folder', createdAt: new Date('2024-02-03'), parentId: '3' },
    { id: '311', name: 'Miniatures', type: 'folder', createdAt: new Date('2024-02-05'), parentId: '31' },
    { id: '312', name: 'Scripts', type: 'folder', createdAt: new Date('2024-02-06'), parentId: '31' },
    { id: '313', name: 'Effets', type: 'folder', createdAt: new Date('2024-02-07'), parentId: '31' },
  ]);

  const [content, setContent] = useState<ContentItem[]>([
    // Contenu YouTube - Vidéos Longues
    {
      id: 'c1',
      name: '5 Secrets pour 10K€/mois',
      type: 'content',
      platform: 'youtube',
      contentType: 'video',
      title: '5 Secrets pour 10K€/mois avec l\'IA',
      description: 'Découvrez mes 5 secrets pour générer 10 000€ par mois grâce à l\'intelligence artificielle...',
      thumbnail: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=300&h=200&fit=crop',
      createdAt: new Date('2024-02-20'),
      parentId: '21',
      metadata: {
        duration: '12:34',
        views: 287000,
        likes: 12400,
        status: 'published'
      }
    },
    {
      id: 'c2',
      name: 'Comment créer une formation en ligne',
      type: 'content',
      platform: 'youtube',
      contentType: 'video',
      title: 'Comment créer une formation en ligne qui se vend',
      description: 'Guide complet pour créer et vendre sa première formation en ligne...',
      thumbnail: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=300&h=200&fit=crop',
      createdAt: new Date('2024-02-18'),
      parentId: '21',
      metadata: {
        duration: '18:45',
        views: 156000,
        likes: 8900,
        status: 'published'
      }
    },
    // Contenu Instagram - Reels
    {
      id: 'c3',
      name: 'Reel Motivation',
      type: 'content',
      platform: 'instagram',
      contentType: 'reel',
      title: 'La motivation du lundi 🔥',
      description: 'Commencez votre semaine avec cette dose de motivation ! #motivation #lundi #entrepreneur',
      thumbnail: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=300&h=400&fit=crop',
      createdAt: new Date('2024-02-19'),
      parentId: '11',
      metadata: {
        duration: '0:30',
        views: 45600,
        likes: 2340,
        status: 'published'
      }
    }
  ]);

  const [currentPath, setCurrentPath] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [showCreateFolder, setShowCreateFolder] = useState(false);
  const [newFolderName, setNewFolderName] = useState('');
  const [contextMenu, setContextMenu] = useState<{ id: string; x: number; y: number } | null>(null);
  const [showAddContent, setShowAddContent] = useState(false);
  const [selectedContent, setSelectedContent] = useState<ContentItem | null>(null);
  const [showContentDetail, setShowContentDetail] = useState(false);

  const getCurrentFolderId = () => {
    return currentPath.length > 0 ? currentPath[currentPath.length - 1] : null;
  };

  const getPlatformIcon = (platform?: string) => {
    switch (platform) {
      case 'youtube':
        return <Play className="w-12 h-12 text-red-500 mx-auto mb-2" />;
      case 'instagram':
        return <Camera className="w-12 h-12 text-pink-500 mx-auto mb-2" />;
      case 'tiktok':
        return <Video className="w-12 h-12 text-white mx-auto mb-2" />;
      case 'facebook':
        return <Users className="w-12 h-12 text-blue-600 mx-auto mb-2" />;
      case 'linkedin':
        return <Briefcase className="w-12 h-12 text-blue-700 mx-auto mb-2" />;
      case 'resources':
        return <Palette className="w-12 h-12 text-purple-500 mx-auto mb-2" />;
      default:
        return <Folder className="w-12 h-12 text-blue-400 mx-auto mb-2" />;
    }
  };

  const getCurrentItems = () => {
    const currentFolderId = getCurrentFolderId();
    
    const currentFolders = folders.filter(folder => {
      if (currentFolderId === null) {
        return folder.parentId === undefined;
      } else {
        return folder.parentId === currentFolderId;
      }
    }).filter(folder => folder.name.toLowerCase().includes(searchQuery.toLowerCase()));

    const currentContent = content.filter(item => {
      return currentFolderId !== null && item.parentId === currentFolderId;
    }).filter(item => item.title.toLowerCase().includes(searchQuery.toLowerCase()));

    return [...currentFolders, ...currentContent];
  };

  const navigateToFolder = (folderId: string) => {
    setCurrentPath([...currentPath, folderId]);
  };

  const navigateBack = () => {
    setCurrentPath(currentPath.slice(0, -1));
  };

  const createFolder = () => {
    if (newFolderName.trim()) {
      const newFolder: FolderItem = {
        id: Date.now().toString(),
        name: newFolderName.trim(),
        type: 'folder',
        createdAt: new Date(),
        parentId: getCurrentFolderId() || undefined
      };
      setFolders([...folders, newFolder]);
      setNewFolderName('');
      setShowCreateFolder(false);
    }
  };

  const deleteFolder = (folderId: string) => {
    setFolders(prev => prev.filter(f => f.id !== folderId));
    setContextMenu(null);
  };

  const openContentDetail = (contentItem: ContentItem) => {
    setSelectedContent(contentItem);
    setShowContentDetail(true);
  };

  const getBreadcrumbs = () => {
    const breadcrumbs = [{ name: 'Mon Drive', path: [] }];
    let currentPathCopy: string[] = [];
    
    for (const folderId of currentPath) {
      currentPathCopy.push(folderId);
      const folder = folders.find(f => f.id === folderId);
      if (folder) {
        breadcrumbs.push({ name: folder.name, path: [...currentPathCopy] });
      }
    }
    
    return breadcrumbs;
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('fr-FR', { 
      day: 'numeric', 
      month: 'short', 
      year: 'numeric' 
    });
  };

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Background avec cadrillage */}
      <div className="absolute inset-0" 
           style={{
             backgroundImage: `
               linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px),
               linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px),
               radial-gradient(circle at center, rgba(32,108,232,0.3) 0%, transparent 70%)
             `,
             backgroundSize: '70px 80px, 70px 80px, 100% 100%'
           }} 
      />

      <div className="relative z-10 p-6 max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-4xl font-bold mb-4 text-center bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            Gestion du Contenu
          </h1>
          
          {/* Toolbar */}
          <div className="led-card p-4 mb-6">
            <div className="flex items-center justify-between flex-wrap gap-4">
              {/* Navigation et breadcrumbs */}
              <div className="flex items-center gap-3">
                {currentPath.length > 0 && (
                  <button
                    onClick={navigateBack}
                    className="p-2 rounded-lg bg-blue-500/20 hover:bg-blue-500/30 transition-colors"
                  >
                    <ArrowLeft className="w-4 h-4 text-blue-400" />
                  </button>
                )}
                
                <div className="flex items-center gap-2 text-sm">
                  {getBreadcrumbs().map((breadcrumb, index) => (
                    <React.Fragment key={index}>
                      <button
                        onClick={() => setCurrentPath(breadcrumb.path)}
                        className="hover:text-blue-400 transition-colors"
                      >
                        {breadcrumb.name}
                      </button>
                      {index < getBreadcrumbs().length - 1 && (
                        <span className="text-gray-500">/</span>
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setShowCreateFolder(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg transition-colors"
                >
                  <FolderPlus className="w-4 h-4" />
                  Nouveau dossier
                </button>
                
                {getCurrentFolderId() && (
                  <button
                    onClick={() => setShowAddContent(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 rounded-lg transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                    Ajouter du contenu
                  </button>
                )}
                
                <div className="flex items-center gap-2 border-l border-gray-600 pl-3">
                  <button
                    onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
                    className="p-2 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors"
                  >
                    {viewMode === 'grid' ? <List className="w-4 h-4" /> : <Grid className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            </div>

            {/* Search bar */}
            <div className="mt-4 relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Rechercher dans le contenu..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-600 rounded-lg focus:border-blue-500 focus:outline-none text-white"
              />
            </div>
          </div>
        </div>

        {/* Content Area */}
        <AnimatePresence mode="wait">
          <motion.div 
            key={currentPath.join('/')}
            className="led-card p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ 
              duration: 0.3,
              ease: "easeInOut"
            }}
          >
            {getCurrentItems().length === 0 ? (
              <div className="text-center py-12">
                <Folder className="w-16 h-16 text-gray-500 mx-auto mb-4" />
                <p className="text-gray-400 text-lg mb-2">
                  {searchQuery ? 'Aucun résultat trouvé' : 'Ce dossier est vide'}
                </p>
                <p className="text-gray-500 text-sm">
                  {searchQuery ? 'Essayez avec d\'autres mots-clés' : 'Créez votre premier dossier pour organiser votre contenu'}
                </p>
              </div>
            ) : (
              <div className={viewMode === 'grid' ? 'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4' : 'space-y-2'}>
                {getCurrentItems().map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ 
                      opacity: 1, 
                      scale: 1,
                      transition: {
                        duration: 0.4,
                        delay: index * 0.05,
                        ease: "easeOut"
                      }
                    }}
                    whileHover={{ 
                      scale: 1.03,
                      transition: { duration: 0.2 }
                    }}
                    whileTap={{ scale: 0.97 }}
                    className="folder-item-grid cursor-pointer"
                    onClick={() => {
                      if (item.type === 'content') {
                        openContentDetail(item as ContentItem);
                      } else if (item.type === 'folder') {
                        navigateToFolder(item.id);
                      }
                    }}
                    onContextMenu={(e) => {
                      e.preventDefault();
                      setContextMenu({ id: item.id, x: e.clientX, y: e.clientY });
                    }}
                  >
                    {item.type === 'folder' ? (
                      <div className="relative">
                        {getPlatformIcon((item as FolderItem).platform)}
                        {item.isStarred && (
                          <Star className="w-4 h-4 text-yellow-400 absolute -top-1 -right-1 fill-current" />
                        )}
                        <p className="text-sm text-center truncate px-2">{item.name}</p>
                        <p className="text-xs text-gray-400 text-center">
                          {formatDate(item.createdAt)}
                        </p>
                      </div>
                    ) : (
                      <div className="relative">
                        <div className="w-full h-24 bg-gray-800 rounded-lg overflow-hidden mb-2">
                          <img 
                            src={(item as ContentItem).thumbnail} 
                            alt={(item as ContentItem).title}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute bottom-1 right-1 bg-black/70 text-white text-xs px-1 rounded">
                            {(item as ContentItem).metadata?.duration}
                          </div>
                        </div>
                        {item.isStarred && (
                          <Star className="w-4 h-4 text-yellow-400 absolute -top-1 -right-1 fill-current" />
                        )}
                        <p className="text-sm text-center truncate px-2">
                          {(item as ContentItem).title}
                        </p>
                        <div className="text-xs text-gray-400 text-center">
                          <div className="flex items-center justify-center gap-2">
                            <span>{(item as ContentItem).metadata?.views?.toLocaleString()} vues</span>
                            <span>•</span>
                            <span className={`px-1 rounded text-xs ${
                              (item as ContentItem).metadata?.status === 'published' ? 'bg-green-500/20 text-green-400' :
                              (item as ContentItem).metadata?.status === 'scheduled' ? 'bg-yellow-500/20 text-yellow-400' :
                              'bg-gray-500/20 text-gray-400'
                            }`}>
                              {(item as ContentItem).metadata?.status}
                            </span>
                          </div>
                        </div>
                        <p className="text-xs text-gray-400 text-center">
                          {formatDate(item.createdAt)}
                        </p>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Create Folder Modal */}
        <AnimatePresence>
          {showCreateFolder && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
              onClick={() => setShowCreateFolder(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="led-card p-6 max-w-md w-full mx-4"
                onClick={(e) => e.stopPropagation()}
              >
                <h3 className="text-xl font-semibold mb-4">Créer un nouveau dossier</h3>
                <input
                  type="text"
                  placeholder="Nom du dossier"
                  value={newFolderName}
                  onChange={(e) => setNewFolderName(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && createFolder()}
                  className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg focus:border-blue-500 focus:outline-none text-white mb-4"
                  autoFocus
                />
                <div className="flex gap-3 justify-end">
                  <button
                    onClick={() => setShowCreateFolder(false)}
                    className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
                  >
                    Annuler
                  </button>
                  <button
                    onClick={createFolder}
                    disabled={!newFolderName.trim()}
                    className="px-4 py-2 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-600 disabled:cursor-not-allowed rounded-lg transition-colors"
                  >
                    Créer
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Content Detail Modal */}
        <AnimatePresence>
          {showContentDetail && selectedContent && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
              onClick={() => setShowContentDetail(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="led-card p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-start gap-4 mb-6 pb-6 border-b border-gray-700">
                  <img 
                    src={selectedContent.thumbnail} 
                    alt={selectedContent.title}
                    className="w-32 h-20 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-white mb-2">{selectedContent.title}</h2>
                    <div className="flex items-center gap-4 text-sm text-gray-400 mb-2">
                      <span>{selectedContent.metadata?.views?.toLocaleString()} vues</span>
                      <span>•</span>
                      <span className={`px-2 py-1 rounded text-xs ${
                        selectedContent.metadata?.status === 'published' ? 'bg-green-500/20 text-green-400' :
                        selectedContent.metadata?.status === 'scheduled' ? 'bg-yellow-500/20 text-yellow-400' :
                        'bg-gray-500/20 text-gray-400'
                      }`}>
                        {selectedContent.metadata?.status}
                      </span>
                      <span>•</span>
                      <span>{formatDate(selectedContent.createdAt)}</span>
                    </div>
                    <p className="text-gray-300 text-sm">{selectedContent.description}</p>
                  </div>
                  <button
                    onClick={() => setShowContentDetail(false)}
                    className="p-2 rounded-lg hover:bg-gray-700"
                  >
                    <ArrowLeft className="w-5 h-5" />
                  </button>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-white">📝 Ressources</h3>
                    <textarea
                      className="w-full h-32 p-3 bg-gray-800 border border-gray-600 rounded-lg focus:border-blue-500 focus:outline-none text-white text-sm"
                      placeholder="Script de la vidéo..."
                    />
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-white">🤖 Conseils IA</h3>
                    <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                      <div className="flex items-start gap-3">
                        <span className="text-green-400 text-sm">✅</span>
                        <div>
                          <h4 className="font-medium text-green-400 mb-1">Ce qui fonctionne</h4>
                          <p className="text-sm text-gray-300">
                            Cette vidéo cartonne ! Crée une série sur le même thème.
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
                      <div className="flex items-start gap-3">
                        <span className="text-red-400 text-sm">❌</span>
                        <div>
                          <h4 className="font-medium text-red-400 mb-1">À éviter</h4>
                          <p className="text-sm text-gray-300">
                            Ne change pas ta miniature maintenant, elle fonctionne parfaitement.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 justify-end pt-6 mt-6 border-t border-gray-700">
                  <button
                    onClick={() => setShowContentDetail(false)}
                    className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
                  >
                    Fermer
                  </button>
                  <button
                    className="px-6 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg transition-colors text-white"
                  >
                    Sauvegarder
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Context Menu */}
        <AnimatePresence>
          {contextMenu && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="fixed z-50 bg-gray-800 border border-gray-600 rounded-lg shadow-xl py-2 min-w-[160px]"
              style={{ left: contextMenu.x, top: contextMenu.y }}
              onMouseLeave={() => setContextMenu(null)}
            >
              <button
                onClick={() => deleteFolder(contextMenu.id)}
                className="w-full px-4 py-2 text-left hover:bg-gray-700 flex items-center gap-2 text-red-400"
              >
                <Trash2 className="w-4 h-4" />
                Supprimer
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Drive Partagé Link */}
        <div className="mt-8">
          <div className="mb-4">
            <h2 className="text-2xl font-bold text-white mb-2 bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
              Drive Partagé Link
            </h2>
            <p className="text-gray-400 text-sm">
              Espace collaboratif pour les monteurs et créateurs de miniatures
            </p>
          </div>

          <div className="led-card p-6">
            {/* Toolbar pour Drive Partagé */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-green-400 text-sm font-medium">En ligne</span>
                </div>
                <span className="text-gray-400 text-sm">3 collaborateurs actifs</span>
              </div>
              
              <div className="flex items-center gap-2">
                <button className="flex items-center gap-2 px-3 py-2 bg-green-500 hover:bg-green-600 rounded-lg transition-colors text-sm">
                  <Plus className="w-4 h-4" />
                  Upload fichier
                </button>
                <button className="flex items-center gap-2 px-3 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg transition-colors text-sm">
                  <Users className="w-4 h-4" />
                  Inviter
                </button>
              </div>
            </div>

            {/* Sections du Drive Partagé */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Montages Finis */}
              <div className="bg-gray-800/30 rounded-lg p-4 border border-gray-700">
                <div className="flex items-center gap-2 mb-3">
                  <Play className="w-5 h-5 text-red-400" />
                  <h3 className="font-semibold text-white">Montages Finis</h3>
                  <span className="bg-red-500/20 text-red-400 text-xs px-2 py-1 rounded">4 nouveaux</span>
                </div>
                <div className="space-y-2">
                  {[
                    { name: 'Secrets_10K_FINAL.mp4', size: '2.4 GB', uploader: 'Alex M.', time: '2h' },
                    { name: 'Formation_Complete_V2.mp4', size: '1.8 GB', uploader: 'Sarah K.', time: '4h' },
                    { name: 'Routine_Entrepreneur.mp4', size: '890 MB', uploader: 'Alex M.', time: '1j' }
                  ].map((file, index) => (
                    <div key={index} className="flex items-center gap-3 p-2 rounded hover:bg-gray-700/50 transition-colors">
                      <Video className="w-4 h-4 text-red-400" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-white truncate">{file.name}</p>
                        <p className="text-xs text-gray-400">{file.size} • par {file.uploader} • il y a {file.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Miniatures Finies */}
              <div className="bg-gray-800/30 rounded-lg p-4 border border-gray-700">
                <div className="flex items-center gap-2 mb-3">
                  <Camera className="w-5 h-5 text-pink-400" />
                  <h3 className="font-semibold text-white">Miniatures Finies</h3>
                  <span className="bg-pink-500/20 text-pink-400 text-xs px-2 py-1 rounded">7 nouvelles</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { name: 'Thumb_Secrets_v3.jpg', uploader: 'Lisa D.', time: '30min' },
                    { name: 'Formation_Thumb.jpg', uploader: 'Mike R.', time: '1h' },
                    { name: 'Routine_Thumbnail.jpg', uploader: 'Lisa D.', time: '2h' },
                    { name: 'Business_Tips.jpg', uploader: 'Mike R.', time: '3h' }
                  ].map((file, index) => (
                    <div key={index} className="relative group">
                      <div className="w-full h-16 bg-gradient-to-br from-pink-500/20 to-purple-500/20 rounded border border-pink-500/30 flex items-center justify-center">
                        <Camera className="w-6 h-6 text-pink-400" />
                      </div>
                      <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity rounded flex flex-col justify-center p-2">
                        <p className="text-xs text-white font-medium truncate">{file.name}</p>
                        <p className="text-xs text-gray-300">par {file.uploader}</p>
                        <p className="text-xs text-gray-400">il y a {file.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Ressources Partagées */}
              <div className="bg-gray-800/30 rounded-lg p-4 border border-gray-700">
                <div className="flex items-center gap-2 mb-3">
                  <Palette className="w-5 h-5 text-purple-400" />
                  <h3 className="font-semibold text-white">Ressources Partagées</h3>
                  <span className="bg-purple-500/20 text-purple-400 text-xs px-2 py-1 rounded">12 fichiers</span>
                </div>
                <div className="space-y-2">
                  {[
                    { name: 'Logo_Pack_2024.zip', type: 'Archive', uploader: 'Design Team', time: '1j' },
                    { name: 'Fonts_Collection.zip', type: 'Fonts', uploader: 'Sarah K.', time: '2j' },
                    { name: 'Music_Trending.mp3', type: 'Audio', uploader: 'Audio Pro', time: '5h' },
                    { name: 'Templates_Stories.psd', type: 'Template', uploader: 'Design Team', time: '1j' }
                  ].map((file, index) => (
                    <div key={index} className="flex items-center gap-3 p-2 rounded hover:bg-gray-700/50 transition-colors">
                      <div className="w-8 h-8 bg-purple-500/20 rounded flex items-center justify-center">
                        <Palette className="w-4 h-4 text-purple-400" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-white truncate">{file.name}</p>
                        <p className="text-xs text-gray-400">{file.type} • par {file.uploader} • il y a {file.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Activité récente */}
            <div className="mt-6 pt-6 border-t border-gray-700">
              <h3 className="text-lg font-semibold text-white mb-3">📋 Activité récente</h3>
              <div className="space-y-2">
                {[
                  { action: 'a uploadé', file: 'Secrets_10K_FINAL.mp4', user: 'Alex M.', time: '2h', type: 'upload' },
                  { action: 'a modifié', file: 'Thumb_Secrets_v3.jpg', user: 'Lisa D.', time: '30min', type: 'edit' },
                  { action: 'a commenté', file: 'Formation_Complete_V2.mp4', user: 'Sarah K.', time: '1h', type: 'comment' },
                  { action: 'a téléchargé', file: 'Logo_Pack_2024.zip', user: 'Mike R.', time: '3h', type: 'download' }
                ].map((activity, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-gray-800/20">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      activity.type === 'upload' ? 'bg-green-500/20' :
                      activity.type === 'edit' ? 'bg-blue-500/20' :
                      activity.type === 'comment' ? 'bg-yellow-500/20' :
                      'bg-purple-500/20'
                    }`}>
                      <span className="text-xs font-bold">
                        {activity.user.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-white">
                        <span className="font-medium">{activity.user}</span> {activity.action} <span className="text-blue-400">{activity.file}</span>
                      </p>
                      <p className="text-xs text-gray-400">il y a {activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .led-card {
          background: #1b1b1b;
          border-radius: 20px;
          border: 2px solid transparent;
          background-clip: padding-box;
          box-shadow:
            0 0 15px rgba(59, 130, 246, 0.4),
            0 0 30px rgba(96, 165, 250, 0.2),
            0 0 45px rgba(59, 130, 246, 0.2);
          position: relative;
          transition: all 0.3s ease;
        }
        .led-card:hover {
          transform: scale(1.01);
          box-shadow:
            0 0 20px rgba(59, 130, 246, 0.6),
            0 0 40px rgba(96, 165, 250, 0.4),
            0 0 60px rgba(59, 130, 246, 0.4);
        }
        .folder-item-grid {
          padding: 16px;
          border-radius: 12px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          position: relative;
          overflow: hidden;
          will-change: transform;
        }
        .folder-item-grid:hover {
          background: rgba(59, 130, 246, 0.1);
          border-color: rgba(59, 130, 246, 0.3);
          box-shadow: 0 4px 20px rgba(59, 130, 246, 0.15);
        }
      `}</style>
    </div>
  );
}