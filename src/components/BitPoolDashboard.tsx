import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Bitcoin, 
  Shield, 
  Users, 
  Plus, 
  ArrowDownUp, 
  Vote,
  Vault,
  Clock,
  CheckCircle,
  AlertCircle
} from "lucide-react";

interface Transaction {
  id: string;
  type: 'deposit' | 'withdrawal' | 'vault_deposit';
  amount: number;
  member: string;
  timestamp: string;
  status: 'completed' | 'pending' | 'approved';
}

interface WithdrawalRequest {
  id: string;
  requester: string;
  amount: number;
  reason: string;
  votesFor: number;
  votesAgainst: number;
  totalMembers: number;
  timeLeft: string;
  status: 'pending' | 'approved' | 'rejected';
}

export default function BitPoolDashboard() {
  const [totalBalance] = useState(0.75); // BTC
  const [availableBalance] = useState(0.625); // BTC
  const [vaultBalance] = useState(0.125); // BTC
  const [memberCount] = useState(8);
  
  const [recentTransactions] = useState<Transaction[]>([
    {
      id: '1',
      type: 'deposit',
      amount: 0.05,
      member: 'Alice M.',
      timestamp: '2 hours ago',
      status: 'completed'
    },
    {
      id: '2',
      type: 'withdrawal',
      amount: 0.1,
      member: 'Bob K.',
      timestamp: '1 day ago',
      status: 'approved'
    },
    {
      id: '3',
      type: 'vault_deposit',
      amount: 0.005,
      member: 'Auto-save',
      timestamp: '2 hours ago',
      status: 'completed'
    }
  ]);

  const [pendingRequests] = useState<WithdrawalRequest[]>([
    {
      id: '1',
      requester: 'Carol D.',
      amount: 0.08,
      reason: 'Emergency medical expenses',
      votesFor: 5,
      votesAgainst: 1,
      totalMembers: 8,
      timeLeft: '18 hours',
      status: 'pending'
    }
  ]);

  const formatBTC = (amount: number) => `₿${amount.toFixed(6)}`;
  const formatUSD = (amount: number) => `$${(amount * 43000).toLocaleString()}`;

  return (
    <div className="min-h-screen bg-background p-4 md:p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary rounded-lg">
              <Bitcoin className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">BitPool</h1>
              <p className="text-muted-foreground">Family Savings Group</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium">{memberCount} members</span>
          </div>
        </div>

        {/* Balance Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Bitcoin className="h-4 w-4" />
                Total Balance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatBTC(totalBalance)}</div>
              <p className="text-sm text-muted-foreground">{formatUSD(totalBalance)}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <ArrowDownUp className="h-4 w-4" />
                Available
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatBTC(availableBalance)}</div>
              <p className="text-sm text-muted-foreground">{formatUSD(availableBalance)}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Vault className="h-4 w-4 text-vault" />
                Vault (Locked)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-vault">{formatBTC(vaultBalance)}</div>
              <p className="text-sm text-muted-foreground">{formatUSD(vaultBalance)}</p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <Button className="h-16 flex flex-col gap-1">
                <Plus className="h-5 w-5" />
                Deposit
              </Button>
              <Button variant="outline" className="h-16 flex flex-col gap-1">
                <ArrowDownUp className="h-5 w-5" />
                Request
              </Button>
              <Button variant="outline" className="h-16 flex flex-col gap-1">
                <Vote className="h-5 w-5" />
                Vote
              </Button>
              <Button variant="outline" className="h-16 flex flex-col gap-1">
                <Shield className="h-5 w-5" />
                Rules
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Pending Requests */}
        {pendingRequests.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-pending" />
                Pending Requests
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {pendingRequests.map((request) => (
                <div key={request.id} className="border rounded-lg p-4 space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-medium">{request.requester}</p>
                      <p className="text-sm text-muted-foreground">{request.reason}</p>
                      <p className="text-lg font-bold">{formatBTC(request.amount)}</p>
                    </div>
                    <Badge variant="outline" className="border-pending text-pending">
                      {request.timeLeft} left
                    </Badge>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Votes: {request.votesFor} for, {request.votesAgainst} against</span>
                      <span>{request.votesFor}/{Math.ceil(request.totalMembers * 0.6)} needed</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div 
                        className="bg-accent h-2 rounded-full" 
                        style={{ width: `${(request.votesFor / Math.ceil(request.totalMembers * 0.6)) * 100}%` }}
                      />
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button size="sm" className="flex-1">
                      <CheckCircle className="h-4 w-4 mr-1" />
                      Approve
                    </Button>
                    <Button size="sm" variant="destructive" className="flex-1">
                      <AlertCircle className="h-4 w-4 mr-1" />
                      Reject
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        )}

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentTransactions.map((tx, index) => (
                <div key={tx.id}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-full ${
                        tx.type === 'deposit' ? 'bg-accent/10' : 
                        tx.type === 'vault_deposit' ? 'bg-vault/10' : 'bg-muted'
                      }`}>
                        {tx.type === 'deposit' ? (
                          <Plus className={`h-4 w-4 ${tx.type === 'deposit' ? 'text-accent' : ''}`} />
                        ) : tx.type === 'vault_deposit' ? (
                          <Vault className="h-4 w-4 text-vault" />
                        ) : (
                          <ArrowDownUp className="h-4 w-4" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium">{tx.member}</p>
                        <p className="text-sm text-muted-foreground">
                          {tx.type === 'deposit' ? 'Deposited' : 
                           tx.type === 'vault_deposit' ? 'Auto-saved to vault' : 'Withdrew'} • {tx.timestamp}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`font-medium ${
                        tx.type === 'deposit' || tx.type === 'vault_deposit' ? 'text-accent' : ''
                      }`}>
                        {tx.type === 'withdrawal' ? '-' : '+'}{formatBTC(tx.amount)}
                      </p>
                      <Badge variant={tx.status === 'completed' ? 'default' : 'secondary'} className="text-xs">
                        {tx.status}
                      </Badge>
                    </div>
                  </div>
                  {index < recentTransactions.length - 1 && <Separator className="mt-4" />}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Security Info */}
        <Card className="border-accent/20">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <Shield className="h-5 w-5 text-accent" />
              <div>
                <p className="font-medium">Group Protection Active</p>
                <p className="text-sm text-muted-foreground">
                  Max withdrawal: 20% • Auto-vault: 10% • Requires 60% approval for large amounts
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}