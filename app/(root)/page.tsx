import HeaderBox from '@/components/HeaderBox'
import RightSidebar from '@/components/RightSidebar'
import TotalBalanceBox from '@/components/TotalBalanceBox'
import { getAccount, getAccounts } from '@/lib/actions/bank.actions'
import { getLoggedInUser } from '@/lib/actions/user.actions'
import React from 'react'

const Dashboard = async ({ searchParams: { id, page } }: SearchParamProps) => {
  const loggedIn = await getLoggedInUser()
  const accounts = await getAccounts({ userId: loggedIn?.$id })

  if (!accounts) return

  const accountsData = accounts?.data
  const appwriteItemId = (id as string) || accountsData[0]?.appwriteItemId

  const account = await getAccount({ appwriteItemId })

  return (
    <section className="dashboard">
        <div className="dashboard-content">
            <header className="dashboard-header">
                <HeaderBox
                  type="greeting"
                  title="Welcome,"
                  user={loggedIn?.firstName || 'Guest' }
                  subtext="Access and manage your accounts and transactions efficiently."
                />
                <TotalBalanceBox
                  accounts={accountsData}
                  totalBanks={accounts?.totalBanks}
                  totalCurrentBalance={accounts?.totalCurrentBalance}
                />
            </header>

            RECENT TRANSACTIONS
        </div>

        <RightSidebar 
          user={loggedIn}
          transactions={accounts?.transactions}
          banks={accountsData?.slice(0, 2)}
        />
    </section>
  )
}

export default Dashboard