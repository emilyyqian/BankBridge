import HeaderBox from '@/components/HeaderBox'
import RightSidebar from '@/components/RightSidebar'
import TotalBalanceBox from '@/components/TotalBalanceBox'
import { getLoggedInUser } from '@/lib/actions/user.actions'
import React from 'react'

const Dashboard = async () => {
  const loggedIn = await getLoggedInUser()
  return (
    <section className="dashboard">
        <div className="dashboard-content">
            <header className="dashboard-header">
                <HeaderBox
                  type="greeting"
                  title="Welcome,"
                  user={loggedIn?.name || 'Guest' }
                  subtext="Access and manage your accounts and transactions efficiently."
                />
                <TotalBalanceBox
                  accounts={[]}
                  totalBanks={1}
                  totalCurrentBalance={1472.45}
                />
            </header>

            RECENT TRANSACTIONS
        </div>

        <RightSidebar 
          user={loggedIn}
          transactions={[]}
          banks={[{ currentBalance: 145.50 }, { currentBalance: 534.35 }]}
        />
    </section>
  )
}

export default Dashboard