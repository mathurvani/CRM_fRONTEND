import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { BarChart, Users, Mail, PieChart } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { format } from "date-fns";


const recentCampaigns = [
  {
    name: "Summer Sale",
    audience: "Active Customers",
    dateSent: "2023-06-15",
    status: "Sent",
    openRate: "24%",
    clickRate: "8%",
  },
  {
    name: "New Product Launch",
    audience: "All Subscribers",
    dateSent: "2023-06-10",
    status: "Sent",
    openRate: "32%",
    clickRate: "12%",
  },
  {
    name: "Customer Feedback",
    audience: "Recent Purchasers",
    dateSent: "-",
    status: "Draft",
    openRate: "-",
    clickRate: "-",
  },
];

const analyticsData = {
  totalAudience: 50000,
  totalCampaigns: 25,
  engagementRate: "18%",
};

const Home = () => {
  const [user, setUser] = useState();
  const [userName, setUserName] = useState("");
  const [segmentCount, setSegmentCount] = useState(12);
  const [SegmentData, setSegmentData] = useState([]);
  const [Customers, setCustomers] = useState(0);
  const [CampaignsData, setCampaigns] = useState([]);
  const navigate = useNavigate()
  useEffect(() => {
    const fetchData = async () => {
      try {
        
        const [audienceresp, campaignresp, customerresp] = await Promise.all([
          fetch("https://crm-t5jp.vercel.app/api/v1/audience/allsegments").then(
            (res) => res.json()
          ),
          fetch("https://crm-t5jp.vercel.app/api/v1/campaigns/allcampaigns").then(
            (res) => res.json()
          ),
          fetch("https://crm-t5jp.vercel.app/api/v1/customers/retrieve").then((res) =>
            res.json()
        ),
      ]);
      setSegmentData(audienceresp);
      setSegmentCount(audienceresp.length);
      setCampaigns(campaignresp);
      setCustomers(customerresp.Customers.length);
      //   setCustomers(customerresp.Customers)
    } catch (error) {
      console.log(error);
    }
  };
  fetchData();
  const setData = async () => {
    const token = localStorage.getItem("authToken");
    const data = await fetch("https://crm-t5jp.vercel.app/api/v1/users/getdata", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => res.json());
    setUser(data.user);
    setUserName(data.user.firstName)
  };
  setData();
}, []);

  return (
    <div className="container mx-auto p-4 space-y-6">
      {/* Welcome Banner */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Welcome, {userName}!</CardTitle>
          <CardDescription>Here's your Campaign Manager.</CardDescription>
        </CardHeader>
      </Card>
      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Button
          className="h-auto py-4"
          variant="outline"
          onClick={() => navigate("/audience")}
        >
          <div className="flex flex-col items-center">
            <Users className="mb-2" />
            Create New Audience Segment
          </div>
        </Button>

        <Button
          className="h-auto py-4"
          variant="outline"
          onClick={() => navigate("/campaign")}
        >
          <div className="flex flex-col items-center">
            <Mail className="mb-2" />
            Create New Campaign
          </div>
        </Button>
        <Button
          className="h-auto py-4"
          variant="outline"
          onClick={() => navigate("/campaign")}
        >
          <div className="flex flex-col items-center">
            <BarChart className="mb-2" />
            View All Campaigns
          </div>
        </Button>
      </div>

      {/* Recent Campaigns Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Campaigns</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Campaign Name</TableHead>
                <TableHead>Target Audience</TableHead>
                <TableHead>Date Sent</TableHead>
                <TableHead>Status</TableHead>
                {/* <TableHead>Open Rate</TableHead>
              <TableHead>Click Rate</TableHead> */}
              </TableRow>
            </TableHeader>
            <TableBody>
              {CampaignsData.map((campaign, index) => (
                <TableRow key={index}>
                  <TableCell>{campaign.name}</TableCell>
                  <TableCell>{campaign.audienceSegment.name}</TableCell>
                  <TableCell>
                    {format(new Date(campaign.startDate), "MMMM d, yyyy")}
                  </TableCell>
                  <TableCell>{campaign?.status || "Open"}</TableCell>
                  {/* <TableCell>{campaign?.openRate}</TableCell>
                <TableCell>{campaign?.clickRate}</TableCell> */}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Audience Segments Overview & Analytics Snapshot */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Audience Segments</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{segmentCount}</p>
            <p>Audience segments created</p>
          </CardContent>
          <CardFooter>
            <Button variant="outline" onClick={() => navigate("/audience")}>
              View All Segments
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Analytics Snapshot</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-2xl font-bold">{Customers}</p>
                <p>Total Audience Size</p>
              </div>
              <div>
                <p className="text-2xl font-bold">{CampaignsData.length}</p>
                <p>Total Campaigns Sent</p>
              </div>
              <div>
                <p className="text-2xl font-bold">
                  {analyticsData.engagementRate}
                </p>
                <p>Engagement Rate</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Footer */}
      <footer className="border-t pt-4 mt-8">
        <div className="flex justify-between items-center">
          <div>
            <a href="/support" className="text-primary hover:underline mr-4">
              Support
            </a>
            <a href="/docs" className="text-primary hover:underline">
              Documentation
            </a>
          </div>
          <div>
            <a href="/privacy" className="text-primary hover:underline mr-4">
              Privacy Policy
            </a>
            <a href="/terms" className="text-primary hover:underline">
              Terms of Service
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
