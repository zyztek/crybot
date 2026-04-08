import { useState, useEffect } from 'react';
import { Shield, Users, Plus, Trash2, Copy, CheckCircle, AlertCircle, Wallet, ArrowRight, Clock, Loader2 } from 'lucide-react';
import { useMultisig } from '../hooks/useGraphQL';

interface Signer {
  address: string;
  name: string;
  status: 'pending' | 'signed' | 'rejected';
}

interface Transaction {
  id: string;
  to: string;
  amount: string;
  token: string;
  data?: string;
  status: 'draft' | 'pending' | 'executed' | 'rejected';
  signatures: string[];
  requiredSignatures: number;
  createdAt: string;
  expiresAt: string;
}

const MultisigTransactionBuilder: React.FC = () => {
  const [threshold, setThreshold] = useState(2);
  const [signers, setSigners] = useState<Signer[]>([
    { address: '0x742d35Cc6634C0532925a3b844Bc9e7595f', name: 'Alice (Deployer)', status: 'signed' },
    { address: '0x9B3a3D17F74b9D6E1f4C5e8F1A2E3D4B5C6D7E8F', name: 'Bob (Treasury)', status: 'pending' },
    { address: '0x1A2B3C4D5E6F7A8B9C0D1E2F3A4B5C6D7E8F9A0B', name: 'Carol (Operations)', status: 'pending' },
  ]);

  // GraphQL hooks
  const { fetchWallets, fetchTransactions, createTransaction, signTransaction, executeTransaction } = useMultisig();
  const [isLoading, setIsLoading] = useState(false);
  const [transactions, setTransactions] = useState<Transaction[]>([
    {
      id: '1',
      to: '0xABC...123',
      amount: '5.5',
      token: 'ETH',
      status: 'pending',
      signatures: ['0x742d...'],
      requiredSignatures: 2,
      createdAt: '2 hours ago',
      expiresAt: '22 hours',
    },
    {
      id: '2',
      to: '0xDEF...456',
      amount: '15000',
      token: 'USDC',
      status: 'executed',
      signatures: ['0x742d...', '0x9B3a...'],
      requiredSignatures: 2,
      createdAt: '1 day ago',
      expiresAt: 'Expired',
    },
  ]);

  const [newTransaction, setNewTransaction] = useState({
    to: '',
    amount: '',
    token: 'ETH',
    data: '',
  });

  const [copied, setCopied] = useState<string | null>(null);

  // Fetch data on mount
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        const [walletsResult, transactionsResult] = await Promise.all([
          fetchWallets.execute(),
          fetchTransactions.execute()
        ]);
        
        if (walletsResult?.multisigWallets && walletsResult.multisigWallets.length > 0) {
          const wallet = walletsResult.multisigWallets[0];
          setSigners(wallet.signers.map((s: any) => ({
            address: s.address,
            name: s.name,
            status: s.status,
          })));
          setThreshold(wallet.threshold);
        }
        if (transactionsResult?.multisigTransactions) {
          setTransactions(transactionsResult.multisigTransactions.map((t: any) => ({
            id: t.id,
            to: t.to.substring(0, 10) + '...',
            amount: t.amount,
            token: t.token,
            data: t.data,
            status: t.status,
            signatures: t.signatures,
            requiredSignatures: t.requiredSignatures,
            createdAt: 'Just now',
            expiresAt: t.expiresAt || '24 hours',
          })));
        }
      } catch (err) {
        // Use mock data on error
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, [fetchWallets, fetchTransactions]);

  const addSigner = () => {
    setSigners([...signers, { address: '', name: '', status: 'pending' }]);
  };

  const handleSubmitTransaction = async () => {
    if (!newTransaction.to || !newTransaction.amount) return;
    setIsLoading(true);
    try {
      const result = await createTransaction.execute({
        walletId: 'default',
        to: newTransaction.to,
        amount: newTransaction.amount,
        token: newTransaction.token,
        data: newTransaction.data || null,
      });
      if (result?.createMultisigTransaction) {
        setTransactions([{
          id: result.createMultisigTransaction.id,
          to: newTransaction.to.substring(0, 10) + '...',
          amount: newTransaction.amount,
          token: newTransaction.token,
          status: 'pending',
          signatures: [],
          requiredSignatures: result.createMultisigTransaction.requiredSignatures,
          createdAt: 'Just now',
          expiresAt: result.createMultisigTransaction.expiresAt || '24 hours',
        }, ...transactions]);
        setNewTransaction({ to: '', amount: '', token: 'ETH', data: '' });
      }
    } catch (err) {
      // Show error
    } finally {
      setIsLoading(false);
    }
  };

  const removeSigner = (index: number) => {
    setSigners(signers.filter((_, i) => i !== index));
  };

  const updateSigner = (index: number, field: keyof Signer, value: string) => {
    const updated = [...signers];
    updated[index] = { ...updated[index], [field]: value };
    setSigners(updated);
  };

  const handleCreateTransaction = () => {
    if (!newTransaction.to || !newTransaction.amount) return;

    const tx: Transaction = {
      id: Date.now().toString(),
      to: newTransaction.to,
      amount: newTransaction.amount,
      token: newTransaction.token,
      data: newTransaction.data || undefined,
      status: 'draft',
      signatures: [],
      requiredSignatures: threshold,
      createdAt: 'Just now',
      expiresAt: '24 hours',
    };

    setTransactions([tx, ...transactions]);
    setNewTransaction({ to: '', amount: '', token: 'ETH', data: '' });
  };

  const copyAddress = (address: string) => {
    navigator.clipboard.writeText(address);
    setCopied(address);
    setTimeout(() => setCopied(null), 2000);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'signed': return 'text-green-400';
      case 'pending': return 'text-yellow-400';
      case 'rejected': return 'text-red-400';
      case 'executed': return 'text-purple-400';
      default: return 'text-slate-400';
    }
  };

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
          <div className="flex items-center gap-2 mb-2">
            <Shield className="w-4 h-4 text-purple-400" />
            <span className="text-slate-400 text-sm">Total Signers</span>
          </div>
          <p className="text-2xl font-bold text-white">{signers.length}</p>
          <p className="text-slate-400 text-xs">{threshold} required to execute</p>
        </div>

        <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
          <div className="flex items-center gap-2 mb-2">
            <Users className="w-4 h-4 text-green-400" />
            <span className="text-slate-400 text-sm">Threshold</span>
          </div>
          <p className="text-2xl font-bold text-white">{threshold}</p>
          <p className="text-slate-400 text-xs">of {signers.length} signatures</p>
        </div>

        <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="w-4 h-4 text-yellow-400" />
            <span className="text-slate-400 text-sm">Pending Txs</span>
          </div>
          <p className="text-2xl font-bold text-yellow-400">
            {transactions.filter(t => t.status === 'pending' || t.status === 'draft').length}
          </p>
          <p className="text-slate-400 text-xs">Awaiting signatures</p>
        </div>

        <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle className="w-4 h-4 text-green-400" />
            <span className="text-slate-400 text-sm">Executed</span>
          </div>
          <p className="text-2xl font-bold text-green-400">
            {transactions.filter(t => t.status === 'executed').length}
          </p>
          <p className="text-slate-400 text-xs">Successfully completed</p>
        </div>
      </div>

      {/* Signers Management */}
      <div className="bg-slate-800/50 rounded-xl border border-slate-700 overflow-hidden">
        <div className="p-4 border-b border-slate-700 flex items-center justify-between">
          <h3 className="text-white font-semibold flex items-center gap-2">
            <Users className="w-5 h-5 text-purple-400" />
            Multi-sig Signers
          </h3>
          <div className="flex items-center gap-3">
            <span className="text-slate-400 text-sm">Threshold:</span>
            <select
              value={threshold}
              onChange={(e) => setThreshold(parseInt(e.target.value))}
              className="bg-slate-700 text-white px-3 py-1 rounded-lg text-sm border border-slate-600"
            >
              {signers.map((_, i) => (
                <option key={i} value={i + 1}>{i + 1}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="p-4">
          <div className="space-y-3">
            {signers.map((signer, index) => (
              <div key={index} className="flex items-center gap-3 p-3 bg-slate-900/50 rounded-lg">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">{signer.name[0]}</span>
                </div>
                <div className="flex-1">
                  <input
                    type="text"
                    value={signer.name}
                    onChange={(e) => updateSigner(index, 'name', e.target.value)}
                    placeholder="Signer name"
                    className="bg-transparent text-white text-sm font-medium w-full focus:outline-none border-b border-transparent focus:border-purple-500"
                  />
                  <input
                    type="text"
                    value={signer.address}
                    onChange={(e) => updateSigner(index, 'address', e.target.value)}
                    placeholder="0x..."
                    className="bg-transparent text-slate-400 text-xs w-full focus:outline-none"
                  />
                </div>
                <span className={`text-xs ${getStatusColor(signer.status)}`}>
                  {signer.status}
                </span>
                {signers.length > 2 && (
                  <button
                    onClick={() => removeSigner(index)}
                    className="p-2 text-slate-400 hover:text-red-400 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            ))}
          </div>

          <button
            onClick={addSigner}
            className="mt-4 flex items-center gap-2 text-purple-400 hover:text-purple-300 text-sm"
          >
            <Plus className="w-4 h-4" />
            Add Signer
          </button>
        </div>
      </div>

      {/* New Transaction Builder */}
      <div className="bg-slate-800/50 rounded-xl border border-slate-700 overflow-hidden">
        <div className="p-4 border-b border-slate-700">
          <h3 className="text-white font-semibold flex items-center gap-2">
            <Wallet className="w-5 h-5 text-purple-400" />
            Create New Transaction
          </h3>
        </div>

        <div className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className="md:col-span-2">
              <label className="text-slate-400 text-xs mb-1 block">Recipient Address</label>
              <input
                type="text"
                value={newTransaction.to}
                onChange={(e) => setNewTransaction({ ...newTransaction, to: e.target.value })}
                placeholder="0x..."
                className="w-full bg-slate-900 text-white px-4 py-2 rounded-lg border border-slate-700 focus:border-purple-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="text-slate-400 text-xs mb-1 block">Amount</label>
              <input
                type="number"
                value={newTransaction.amount}
                onChange={(e) => setNewTransaction({ ...newTransaction, amount: e.target.value })}
                placeholder="0.0"
                className="w-full bg-slate-900 text-white px-4 py-2 rounded-lg border border-slate-700 focus:border-purple-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="text-slate-400 text-xs mb-1 block">Token</label>
              <select
                value={newTransaction.token}
                onChange={(e) => setNewTransaction({ ...newTransaction, token: e.target.value })}
                className="w-full bg-slate-900 text-white px-4 py-2 rounded-lg border border-slate-700 focus:border-purple-500 focus:outline-none"
              >
                <option value="ETH">ETH</option>
                <option value="USDC">USDC</option>
                <option value="USDT">USDT</option>
                <option value="WBTC">WBTC</option>
              </select>
            </div>
            <div className="flex items-end">
              <button
                onClick={handleCreateTransaction}
                disabled={isLoading}
                className="w-full py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
                Create
              </button>
            </div>
          </div>

          <div className="mt-4">
            <label className="text-slate-400 text-xs mb-1 block">Optional Data (hex)</label>
            <input
              type="text"
              value={newTransaction.data}
              onChange={(e) => setNewTransaction({ ...newTransaction, data: e.target.value })}
              placeholder="0x..."
              className="w-full bg-slate-900 text-white px-4 py-2 rounded-lg border border-slate-700 focus:border-purple-500 focus:outline-none text-sm"
            />
          </div>
        </div>
      </div>

      {/* Transactions List */}
      <div className="bg-slate-800/50 rounded-xl border border-slate-700 overflow-hidden">
        <div className="p-4 border-b border-slate-700">
          <h3 className="text-white font-semibold flex items-center gap-2">
            <ArrowRight className="w-5 h-5 text-purple-400" />
            Transaction History
          </h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-900/50">
              <tr className="text-left text-xs text-slate-400">
                <th className="px-4 py-3">Tx ID</th>
                <th className="px-4 py-3">Recipient</th>
                <th className="px-4 py-3 text-right">Amount</th>
                <th className="px-4 py-3 text-center">Signatures</th>
                <th className="px-4 py-3 text-center">Status</th>
                <th className="px-4 py-3 text-center">Expires</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700">
              {transactions.map(tx => (
                <tr key={tx.id} className="text-sm">
                  <td className="px-4 py-3">
                    <span className="text-purple-400 font-mono">#{tx.id}</span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <span className="text-white font-mono">{tx.to.slice(0, 10)}...</span>
                      <button
                        onClick={() => copyAddress(tx.to)}
                        className="text-slate-400 hover:text-white"
                      >
                        {copied === tx.to ? (
                          <CheckCircle className="w-3 h-3 text-green-400" />
                        ) : (
                          <Copy className="w-3 h-3" />
                        )}
                      </button>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <span className="text-white">{tx.amount}</span>
                    <span className="text-slate-400 ml-1">{tx.token}</span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <div className="flex items-center justify-center gap-1">
                      <span className={`font-medium ${tx.signatures.length >= tx.requiredSignatures ? 'text-green-400' : 'text-yellow-400'}`}>
                        {tx.signatures.length}
                      </span>
                      <span className="text-slate-500">/</span>
                      <span className="text-slate-400">{tx.requiredSignatures}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      tx.status === 'executed' ? 'bg-green-500/20 text-green-400' :
                      tx.status === 'pending' ? 'bg-yellow-500/20 text-yellow-400' :
                      tx.status === 'rejected' ? 'bg-red-500/20 text-red-400' :
                      'bg-slate-500/20 text-slate-400'
                    }`}>
                      {tx.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span className="text-slate-400">{tx.expiresAt}</span>
                  </td>
                  <td className="px-4 py-3">
                    <button className="text-purple-400 hover:text-purple-300 text-xs">
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MultisigTransactionBuilder;