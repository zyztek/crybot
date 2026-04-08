import { useState } from 'react';
import { Tag, Plus, Search, Trash2 } from 'lucide-react';

interface AddressLabel {
  address: string;
  label: string;
  category: string;
  notes: string;
}

const AddressLabelManager: React.FC = () => {
  const [labels, setLabels] = useState<AddressLabel[]>([
    { address: '0x742d35Cc6634C0532925a3b844Bc9e7595f0e3A2', label: 'My Wallet', category: 'Personal', notes: 'Main wallet' },
    { address: '0x1Ca532F658B4C7C1C8B4D2F3A5E9C7B8D4F2A1C', label: 'Binance Hot', category: 'Exchange', notes: 'Binance main wallet' },
    { address: '0x9F2e1C8A3B4D5E6F7A8B9C0D1E2F3A4B5C6D7E', label: 'Uniswap V3', category: 'Protocol', notes: 'LP position' },
  ]);

  const [newLabel, setNewLabel] = useState({ address: '', label: '', category: 'Personal', notes: '' });
  const [search, setSearch] = useState('');

  const addLabel = () => {
    if (newLabel.address && newLabel.label) {
      setLabels([...labels, newLabel]);
      setNewLabel({ address: '', label: '', category: 'Personal', notes: '' });
    }
  };

  const deleteLabel = (address: string) => {
    setLabels(labels.filter(l => l.address !== address));
  };

  const filteredLabels = labels.filter(l => 
    l.label.toLowerCase().includes(search.toLowerCase()) || 
    l.address.includes(search)
  );

  return (
    <div className="space-y-6">
      {/* Add New */}
      <div className="bg-slate-800/50 rounded-xl border border-slate-700 p-6">
        <h3 className="text-white font-semibold mb-4">Add New Label</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="text-slate-400 text-sm">Address</label>
            <input
              type="text"
              value={newLabel.address}
              onChange={(e) => setNewLabel({ ...newLabel, address: e.target.value })}
              placeholder="0x..."
              className="w-full bg-slate-700 text-white px-3 py-2 rounded-lg mt-1"
            />
          </div>
          <div>
            <label className="text-slate-400 text-sm">Label</label>
            <input
              type="text"
              value={newLabel.label}
              onChange={(e) => setNewLabel({ ...newLabel, label: e.target.value })}
              placeholder="Label name"
              className="w-full bg-slate-700 text-white px-3 py-2 rounded-lg mt-1"
            />
          </div>
          <div>
            <label className="text-slate-400 text-sm">Category</label>
            <select
              value={newLabel.category}
              onChange={(e) => setNewLabel({ ...newLabel, category: e.target.value })}
              className="w-full bg-slate-700 text-white px-3 py-2 rounded-lg mt-1"
            >
              <option>Personal</option>
              <option>Exchange</option>
              <option>Protocol</option>
              <option>DeFi</option>
              <option>NFT</option>
            </select>
          </div>
          <div className="flex items-end">
            <button
              onClick={addLabel}
              className="w-full px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg font-medium flex items-center justify-center gap-2"
            >
              <Plus className="w-4 h-4" /> Add
            </button>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="w-5 h-5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search labels..."
          className="w-full bg-slate-700 text-white pl-10 pr-4 py-3 rounded-lg"
        />
      </div>

      {/* Labels List */}
      <div className="space-y-3">
        {filteredLabels.map((label, idx) => (
          <div key={idx} className="bg-slate-800/50 rounded-xl border border-slate-700 p-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Tag className="w-5 h-5 text-purple-400" />
              <div>
                <p className="text-white font-medium">{label.label}</p>
                <p className="text-slate-400 text-sm font-mono">{label.address.slice(0, 10)}...{label.address.slice(-8)}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className="px-3 py-1 bg-purple-500/20 text-purple-400 rounded text-sm">{label.category}</span>
              <button onClick={() => deleteLabel(label.address)} className="text-red-400 hover:text-red-300">
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AddressLabelManager;