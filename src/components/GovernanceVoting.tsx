import { useState } from 'react'
import { Vote, CheckCircle, XCircle, Clock, Users, TrendingUp, PieChart } from 'lucide-react'

interface Proposal {
  id: number
  title: string
  description: string
  proposer: string
  status: 'Active' | 'Passed' | 'Rejected' | 'Pending'
  votesFor: number
  votesAgainst: number
  totalVotes: number
  endDate: string
  category: string
}

export default function GovernanceVoting() {
  const [selectedProposal, setSelectedProposal] = useState<number | null>(null)
  const [voteModalOpen, setVoteModalOpen] = useState(false)
  const [voteAmount, setVoteAmount] = useState('')
  const [userVotes, setUserVotes] = useState(12500)
  const [voteWeight, setVoteWeight] = useState(1)

  const proposals: Proposal[] = [
    {
      id: 1,
      title: 'Increase DAO Treasury Yield Strategy',
      description: 'Proposal to diversify the DAO treasury into additional yield-bearing DeFi protocols including Aave, Compound, and Curve Finance.',
      proposer: '0x7a2...f4e9',
      status: 'Active',
      votesFor: 85420,
      votesAgainst: 12350,
      totalVotes: 97770,
      endDate: '2 days 14 hours',
      category: 'Treasury'
    },
    {
      id: 2,
      title: ' 降低 Protocol Fees to 0.2%',
      description: 'Reduce the protocol fee from 0.3% to 0.2% to encourage higher trading volume and increase platform competitiveness.',
      proposer: '0x3b1...a8d2',
      status: 'Active',
      votesFor: 45230,
      votesAgainst: 28900,
      totalVotes: 74130,
      endDate: '5 days 8 hours',
      category: 'Protocol'
    },
    {
      id: 3,
      title: 'Grant for Community Development',
      description: 'Allocate 50,000 tokens to fund community-led development initiatives and educational programs.',
      proposer: '0x9c4...e2b1',
      status: 'Passed',
      votesFor: 125400,
      votesAgainst: 8500,
      totalVotes: 133900,
      endDate: 'Ended',
      category: 'Community'
    },
    {
      id: 4,
      title: 'Add New Token Listings',
      description: 'Proposal to list 5 new tokens on the platform: ARB, OP, STX, INJ, and SEI.',
      proposer: '0x2d8...c9f3',
      status: 'Active',
      votesFor: 67320,
      votesAgainst: 34100,
      totalVotes: 101420,
      endDate: '7 days 2 hours',
      category: 'Operations'
    },
    {
      id: 5,
      title: 'Improve Gas Optimization',
      description: 'Allocate resources to research and implement gas optimization strategies to reduce transaction costs for users.',
      proposer: '0x8e1...d4a7',
      status: 'Rejected',
      votesFor: 23450,
      votesAgainst: 67890,
      totalVotes: 91340,
      endDate: 'Ended',
      category: 'Technical'
    },
    {
      id: 6,
      title: 'Staking Rewards Enhancement',
      description: 'Increase staking rewards for long-term token holders with a tiered reward system.',
      proposer: '0x1f2...b5e6',
      status: 'Pending',
      votesFor: 0,
      votesAgainst: 0,
      totalVotes: 0,
      endDate: 'Starting soon',
      category: 'Rewards'
    },
  ]

  const getStatusColor = (status: Proposal['status']) => {
    switch (status) {
      case 'Active': return 'text-green-400 bg-green-500/20 border-green-500/50'
      case 'Passed': return 'text-blue-400 bg-blue-500/20 border-blue-500/50'
      case 'Rejected': return 'text-red-400 bg-red-500/20 border-red-500/50'
      case 'Pending': return 'text-yellow-400 bg-yellow-500/20 border-yellow-500/50'
    }
  }

  const totalProposals = proposals.length
  const activeProposals = proposals.filter(p => p.status === 'Active').length
  const passedProposals = proposals.filter(p => p.status === 'Passed').length
  const totalParticipation = proposals.reduce((sum, p) => sum + p.totalVotes, 0)

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600/20 to-purple-600/20 backdrop-blur-xl rounded-2xl border border-indigo-500/30 p-6">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
              <Vote className="w-8 h-8 text-indigo-400" />
              Governance Voting
            </h1>
            <p className="text-gray-400">Participate in DAO governance and shape the future of the protocol</p>
          </div>
          <div className="flex gap-3">
            <div className="bg-indigo-500/20 border border-indigo-500/50 rounded-xl px-4 py-2 text-indigo-400 font-semibold flex items-center gap-2">
              <Users className="w-5 h-5" />
              12.4K Voters
            </div>
            <div className="bg-purple-500/20 border border-purple-500/50 rounded-xl px-4 py-2 text-purple-400 font-semibold flex items-center gap-2">
              <PieChart className="w-5 h-5" />
              {totalProposals} Proposals
            </div>
          </div>
        </div>
      </div>

      {/* User Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-indigo-600/20 to-purple-600/20 backdrop-blur-xl rounded-2xl border border-indigo-500/30 p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-400 font-medium">Your Votes</span>
            <Vote className="w-5 h-5 text-indigo-400" />
          </div>
          <div className="text-3xl font-bold text-white">{userVotes.toLocaleString()}</div>
          <div className="text-indigo-400 text-sm mt-2">Voting Power: {voteWeight}x</div>
        </div>

        <div className="bg-gradient-to-br from-green-600/20 to-teal-600/20 backdrop-blur-xl rounded-2xl border border-green-500/30 p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-400 font-medium">Active Proposals</span>
            <Clock className="w-5 h-5 text-green-400" />
          </div>
          <div className="text-3xl font-bold text-white">{activeProposals}</div>
          <div className="text-green-400 text-sm mt-2">Need your vote!</div>
        </div>

        <div className="bg-gradient-to-br from-blue-600/20 to-cyan-600/20 backdrop-blur-xl rounded-2xl border border-blue-500/30 p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-400 font-medium">Passed Proposals</span>
            <CheckCircle className="w-5 h-5 text-blue-400" />
          </div>
          <div className="text-3xl font-bold text-white">{passedProposals}</div>
          <div className="text-blue-400 text-sm mt-2">Implemented</div>
        </div>

        <div className="bg-gradient-to-br from-purple-600/20 to-pink-600/20 backdrop-blur-xl rounded-2xl border border-purple-500/30 p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-400 font-medium">Total Participation</span>
            <Users className="w-5 h-5 text-purple-400" />
          </div>
          <div className="text-3xl font-bold text-white">{(totalParticipation / 1000).toFixed(0)}K</div>
          <div className="text-purple-400 text-sm mt-2">All-time votes</div>
        </div>
      </div>

      {/* Create Proposal Button */}
      <div className="flex gap-4">
        <button className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold px-6 py-3 rounded-xl transition-all flex items-center gap-2">
          <Vote className="w-5 h-5" />
          Create Proposal
        </button>
      </div>

      {/* Proposals List */}
      <div className="bg-gradient-to-b from-gray-800/50 to-gray-900/50 backdrop-blur-xl rounded-2xl border border-gray-700/50 p-6">
        <h2 className="text-2xl font-bold text-white mb-6">Governance Proposals</h2>
        
        <div className="space-y-4">
          {proposals.map((proposal) => (
            <div
              key={proposal.id}
              className="bg-gray-800/50 rounded-xl p-5 border border-gray-700/50 hover:border-gray-600 transition-all cursor-pointer"
              onClick={() => setSelectedProposal(proposal.id)}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(proposal.status)}`}>
                      {proposal.status}
                    </span>
                    <span className="bg-gray-700 text-gray-300 px-2 py-1 rounded text-xs font-medium">{proposal.category}</span>
                    <span className="text-gray-400 text-sm flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {proposal.endDate}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-white mb-2">{proposal.title}</h3>
                  <p className="text-gray-400 text-sm mb-4 line-clamp-2">{proposal.description}</p>
                  
                  <div className="flex items-center gap-6 text-sm">
                    <span className="text-gray-400">
                      Proposer: <span className="text-white font-mono">{proposal.proposer}</span>
                    </span>
                    <span className="text-gray-400">
                      Total Votes: <span className="text-white font-semibold">{proposal.totalVotes.toLocaleString()}</span>
                    </span>
                  </div>
                </div>

                <div className="text-right min-w-[200px]">
                  <div className="mb-3">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-green-400 text-sm font-semibold flex items-center gap-1">
                        <CheckCircle className="w-4 h-4" />
                        For
                      </span>
                      <span className="text-white font-bold">{proposal.votesFor.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-red-400 text-sm font-semibold flex items-center gap-1">
                        <XCircle className="w-4 h-4" />
                        Against
                      </span>
                      <span className="text-white font-bold">{proposal.votesAgainst.toLocaleString()}</span>
                    </div>
                  </div>

                  <div className="h-3 bg-gray-700 rounded-full overflow-hidden flex">
                    <div
                      className="h-full bg-gradient-to-r from-green-500 to-green-400"
                      style={{ width: `${proposal.totalVotes > 0 ? (proposal.votesFor / proposal.totalVotes) * 100 : 50}%` }}
                    />
                    <div
                      className="h-full bg-gradient-to-r from-red-500 to-red-400"
                      style={{ width: `${proposal.totalVotes > 0 ? (proposal.votesAgainst / proposal.totalVotes) * 100 : 50}%` }}
                    />
                  </div>

                  <div className="flex justify-between mt-1 text-xs">
                    <span className="text-green-400 font-semibold">
                      {proposal.totalVotes > 0 ? ((proposal.votesFor / proposal.totalVotes) * 100).toFixed(1) : 0}%
                    </span>
                    <span className="text-red-400 font-semibold">
                      {proposal.totalVotes > 0 ? ((proposal.votesAgainst / proposal.totalVotes) * 100).toFixed(1) : 0}%
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Vote Modal */}
      {selectedProposal && voteModalOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gradient-to-b from-gray-800 to-gray-900 rounded-2xl border border-gray-700 p-6 max-w-md w-full">
            <h2 className="text-2xl font-bold text-white mb-4">Cast Your Vote</h2>
            <div className="space-y-4">
              <div>
                <label className="text-gray-400 text-sm font-medium mb-2 block">Vote Amount</label>
                <div className="bg-gray-800 rounded-xl p-4 border border-gray-700">
                  <input
                    type="number"
                    value={voteAmount}
                    onChange={(e) => setVoteAmount(e.target.value)}
                    className="w-full bg-transparent text-2xl text-white font-bold outline-none"
                    placeholder={`${userVotes.toLocaleString()}`}
                  />
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setVoteModalOpen(false)}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-2"
                >
                  <XCircle className="w-5 h-5" />
                  Vote Against
                </button>
                <button
                  onClick={() => setVoteModalOpen(false)}
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-2"
                >
                  <CheckCircle className="w-5 h-5" />
                  Vote For
                </button>
              </div>

              <button
                onClick={() => setVoteModalOpen(false)}
                className="w-full bg-gray-700 hover:bg-gray-600 text-white font-semibold py-3 rounded-xl transition-all"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Detail Modal for Selected Proposal */}
      {selectedProposal && !voteModalOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gradient-to-b from-gray-800 to-gray-900 rounded-2xl border border-gray-700 p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {(() => {
              const prop = proposals.find(p => p.id === selectedProposal)!
              return (
                <>
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-2xl font-bold text-white">{prop.title}</h2>
                    <button onClick={() => setSelectedProposal(null)} className="text-gray-400 hover:text-white text-2xl">&times;</button>
                  </div>

                  <div className="flex items-center gap-3 mb-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(prop.status)}`}>
                      {prop.status}
                    </span>
                    <span className="bg-gray-700 text-gray-300 px-2 py-1 rounded text-sm">{prop.category}</span>
                  </div>

                  <p className="text-gray-300 mb-6">{prop.description}</p>

                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-gray-800/50 rounded-xl p-4">
                      <div className="text-gray-400 text-sm mb-1">Proposer</div>
                      <div className="text-white font-mono">{prop.proposer}</div>
                    </div>
                    <div className="bg-gray-800/50 rounded-xl p-4">
                      <div className="text-gray-400 text-sm mb-1">End Date</div>
                      <div className="text-white">{prop.endDate}</div>
                    </div>
                  </div>

                  <div className="flex justify-between items-center mb-4">
                    <div className="text-green-400 font-bold text-lg flex items-center gap-2">
                      <CheckCircle className="w-6 h-6" />
                      {prop.votesFor.toLocaleString()} For
                    </div>
                    <div className="text-red-400 font-bold text-lg flex items-center gap-2">
                      <XCircle className="w-6 h-6" />
                      {prop.votesAgainst.toLocaleString()} Against
                    </div>
                  </div>

                  <div className="h-6 bg-gray-700 rounded-full overflow-hidden flex mb-6">
                    <div
                      className="h-full bg-gradient-to-r from-green-500 to-green-400"
                      style={{ width: `${prop.votesFor / prop.totalVotes * 100}%` }}
                    />
                    <div
                      className="h-full bg-gradient-to-r from-red-500 to-red-400"
                      style={{ width: `${prop.votesAgainst / prop.totalVotes * 100}%` }}
                    />
                  </div>

                  {prop.status === 'Active' && (
                    <button
                      onClick={() => setVoteModalOpen(true)}
                      className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-2"
                    >
                      <Vote className="w-5 h-5" />
                      Cast Your Vote
                    </button>
                  )}

                  <button
                    onClick={() => setSelectedProposal(null)}
                    className="w-full mt-3 bg-gray-700 hover:bg-gray-600 text-white font-semibold py-3 rounded-xl transition-all"
                  >
                    Close
                  </button>
                </>
              )
            })()}
          </div>
        </div>
      )}
    </div>
  )
}