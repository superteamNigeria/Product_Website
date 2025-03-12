'use client'

import { getAmigoProgram, getAmigoProgramId } from '@project/anchor'
import { useConnection } from '@solana/wallet-adapter-react'
import { Cluster, Keypair, PublicKey } from '@solana/web3.js'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'
import toast from 'react-hot-toast'
import { useCluster } from '../cluster/cluster-data-access'
import { useAnchorProvider } from '../solana/solana-provider'
import { useTransactionToast } from '../ui/ui-layout'

export function useAmigoProgram() {
  const { connection } = useConnection()
  const { cluster } = useCluster()
  const transactionToast = useTransactionToast()
  const provider = useAnchorProvider()
  const programId = useMemo(() => getAmigoProgramId(cluster.network as Cluster), [cluster])
  const program = useMemo(() => getAmigoProgram(provider, programId), [provider, programId])

  const accounts = useQuery({
    queryKey: ['amigo', 'all', { cluster }],
    queryFn: () => program.account.amigo.all(),
  })

  const getProgramAccount = useQuery({
    queryKey: ['get-program-account', { cluster }],
    queryFn: () => connection.getParsedAccountInfo(programId),
  })

  const initialize = useMutation({
    mutationKey: ['amigo', 'initialize', { cluster }],
    mutationFn: (keypair: Keypair) =>
      program.methods.initialize().accounts({ amigo: keypair.publicKey }).signers([keypair]).rpc(),
    onSuccess: (signature) => {
      transactionToast(signature)
      return accounts.refetch()
    },
    onError: () => toast.error('Failed to initialize account'),
  })

  return {
    program,
    programId,
    accounts,
    getProgramAccount,
    initialize,
  }
}

export function useAmigoProgramAccount({ account }: { account: PublicKey }) {
  const { cluster } = useCluster()
  const transactionToast = useTransactionToast()
  const { program, accounts } = useAmigoProgram()

  const accountQuery = useQuery({
    queryKey: ['amigo', 'fetch', { cluster, account }],
    queryFn: () => program.account.amigo.fetch(account),
  })

  const closeMutation = useMutation({
    mutationKey: ['amigo', 'close', { cluster, account }],
    mutationFn: () => program.methods.close().accounts({ amigo: account }).rpc(),
    onSuccess: (tx) => {
      transactionToast(tx)
      return accounts.refetch()
    },
  })

  const decrementMutation = useMutation({
    mutationKey: ['amigo', 'decrement', { cluster, account }],
    mutationFn: () => program.methods.decrement().accounts({ amigo: account }).rpc(),
    onSuccess: (tx) => {
      transactionToast(tx)
      return accountQuery.refetch()
    },
  })

  const incrementMutation = useMutation({
    mutationKey: ['amigo', 'increment', { cluster, account }],
    mutationFn: () => program.methods.increment().accounts({ amigo: account }).rpc(),
    onSuccess: (tx) => {
      transactionToast(tx)
      return accountQuery.refetch()
    },
  })

  const setMutation = useMutation({
    mutationKey: ['amigo', 'set', { cluster, account }],
    mutationFn: (value: number) => program.methods.set(value).accounts({ amigo: account }).rpc(),
    onSuccess: (tx) => {
      transactionToast(tx)
      return accountQuery.refetch()
    },
  })

  return {
    accountQuery,
    closeMutation,
    decrementMutation,
    incrementMutation,
    setMutation,
  }
}
