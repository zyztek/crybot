/**
 * Database Seed Script
 * 
 * Run with: npx tsx prisma/seed.ts
 */

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // ============== FAUCETS ==============
  const faucets = [
    {
      name: 'Bitcoin Testnet Faucet',
      coin: 'BTC',
      network: 'testnet',
      faucetUrl: 'https://bitcoinfaucet.uo1.net/',
      amountMin: '1000',
      amountMax: '5000',
      intervalHours: 24,
      isActive: true,
    },
    {
      name: 'Ethereum Sepolia Faucet',
      coin: 'ETH',
      network: 'sepolia',
      faucetUrl: 'https://sepoliafaucet.com/',
      amountMin: '10000000000000000', // 0.01 ETH in wei
      amountMax: '50000000000000000', // 0.05 ETH in wei
      intervalHours: 24,
      isActive: true,
    },
    {
      name: 'Dogecoin Testnet Faucet',
      coin: 'DOGE',
      network: 'testnet',
      faucetUrl: 'https://dogecoinfaucet.net/',
      amountMin: '100',
      amountMax: '500',
      intervalHours: 24,
      isActive: true,
    },
    {
      name: 'Solana Devnet Faucet',
      coin: 'SOL',
      network: 'devnet',
      faucetUrl: 'https://solana.com/developers/guides/get-started/solana-devnet-faucet',
      amountMin: '1000000', // 0.001 SOL in lamports
      amountMax: '5000000', // 0.005 SOL in lamports
      intervalHours: 24,
      isActive: true,
    },
    {
      name: 'Litecoin Testnet Faucet',
      coin: 'LTC',
      network: 'testnet',
      faucetUrl: 'https://ltcfaucet.org/',
      amountMin: '1000',
      amountMax: '5000',
      intervalHours: 24,
      isActive: true,
    },
    {
      name: 'BNB Smart Chain Testnet',
      coin: 'BNB',
      network: 'testnet',
      faucetUrl: 'https://testnet.bnbchain.org/faucet-smart',
      amountMin: '10000000000000000',
      amountMax: '50000000000000000',
      intervalHours: 24,
      isActive: true,
    },
  ];

  for (const faucet of faucets) {
    await prisma.faucet.upsert({
      where: { coin_network: { coin: faucet.coin, network: faucet.network } },
      update: {},
      create: faucet,
    });
  }
  console.log('✅ Created faucets');

  // ============== ACHIEVEMENTS ==============
  const achievements = [
    {
      name: 'First Claim',
      description: 'Make your first faucet claim',
      icon: '🎉',
      target: 1,
      reward: '10000000000000000', // 0.01 ETH
      type: 'claims',
    },
    {
      name: 'Frequent Faucet User',
      description: 'Make 10 faucet claims',
      icon: '⭐',
      target: 10,
      reward: '50000000000000000', // 0.05 ETH
      type: 'claims',
    },
    {
      name: 'Dedicated User',
      description: 'Make 50 faucet claims',
      icon: '🏆',
      target: 50,
      reward: '100000000000000000', // 0.1 ETH
      type: 'claims',
    },
    {
      name: 'Crypto Collector',
      description: 'Claim all 6 available coins',
      icon: '💰',
      target: 6,
      reward: '100000000000000000', // 0.1 ETH
      type: 'coins',
    },
    {
      name: 'Referral Master',
      description: 'Refer 5 users to the platform',
      icon: '👥',
      target: 5,
      reward: '200000000000000000', // 0.2 ETH
      type: 'referrals',
    },
    {
      name: 'High Roller',
      description: 'Earn 1 ETH total from claims',
      icon: '💎',
      target: 1000000000000000000, // 1 ETH in wei
      reward: '1000000000000000000', // 1 ETH
      type: 'volume',
    },
    {
      name: 'Early Bird',
      description: 'Join during the beta period',
      icon: '🌅',
      target: 1,
      reward: '50000000000000000', // 0.05 ETH
      type: 'special',
    },
    {
      name: 'Streak Master',
      description: 'Claim every day for 7 days',
      icon: '🔥',
      target: 7,
      reward: '300000000000000000', // 0.3 ETH
      type: 'streak',
    },
  ];

  for (const achievement of achievements) {
    await prisma.achievement.create({
      data: achievement,
    });
  }
  console.log('✅ Created achievements');

  // ============== CREATE DEFAULT USER ACHIEVEMENTS ==============
  // This would be done when users register
  
  console.log('🌱 Seeding complete!');
}

main()
  .catch((e) => {
    console.error('❌ Seed error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });