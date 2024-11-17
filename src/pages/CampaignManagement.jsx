import React, { useState,useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CalendarIcon } from "@radix-ui/react-icons"
import { format } from "date-fns"
import { Calendar } from "@/components/ui/calendar"
import { createCampaign } from '@/services/operations/apis'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { useDispatch } from 'react-redux'


// Mock data for audience segments
const mockAudienceSegments = [
  { id: 1, name: "High Spenders" },
  { id: 2, name: "Frequent Visitors" },
  { id: 3, name: "Recent Customers" },
]

// Mock data for past campaigns
const mockPastCampaigns = [
  { id: 1, name: "Summer Sale", description: "Discount for summer products", startDate: "2023-06-01", endDate: "2023-06-30", audienceSegment: "High Spenders", status: "Completed" },
  { id: 2, name: "New Product Launch", description: "Introducing our latest product", startDate: "2023-07-15", endDate: "2023-08-15", audienceSegment: "All Segments", status: "Active" },
  { id: 3, name: "Customer Appreciation", description: "Special offers for loyal customers", startDate: "2023-09-01", endDate: "2023-09-15", audienceSegment: "Frequent Visitors", status: "Scheduled" },
]

const CampaignCreationForm = ({SegmentData}) => {
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [startDate, setStartDate] = useState()
  const [endDate, setEndDate] = useState()
  const [audienceSegment, setAudienceSegment] = useState("")
  const dispatch = useDispatch()

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle form submission here
    console.log({ name, description, startDate, endDate, audienceSegment })
    dispatch(createCampaign(name,description,startDate,endDate,audienceSegment))
    setDescription('')
    setEndDate('')
    setStartDate('')
    setName('')
    setAudienceSegment('')

  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create New Campaign</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Campaign Name</Label>
            <Input 
              id="name" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter campaign name" 
            />
          </div>
          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea 
              id="description" 
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter campaign description" 
            />
          </div>
          <div className="flex space-x-4">
            <div className="flex-1">
              <Label htmlFor="startDate">Start Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={`w-full justify-start text-left font-normal ${!startDate && "text-muted-foreground"}`}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {startDate ? format(startDate, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={startDate}
                    onSelect={setStartDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div className="flex-1">
              <Label htmlFor="endDate">End Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={`w-full justify-start text-left font-normal ${!endDate && "text-muted-foreground"}`}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {endDate ? format(endDate, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={endDate}
                    onSelect={setEndDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
          <div>
            <Label htmlFor="audienceSegment">Audience Segment</Label>
            <Select onValueChange={setAudienceSegment}>
              <SelectTrigger>
                <SelectValue placeholder="Select audience segment" />
              </SelectTrigger>
              <SelectContent>
                {SegmentData.map((segment) => (
                  <SelectItem key={segment._id} value={segment._id}>
                    {segment.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button type="submit">Create Campaign</Button>
        </form>
      </CardContent>
    </Card>
  )
}

const PastCampaignsPage = ({CampaignsData}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Past Campaigns</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Campaign Name</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Start Date</TableHead>
              <TableHead>End Date</TableHead>
              <TableHead>Audience Segment</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {CampaignsData.map((campaign) => (
              <TableRow key={campaign._id}>
                <TableCell>{campaign.name}</TableCell>
                <TableCell>{campaign.description}</TableCell>
                <TableCell>{format(new Date(campaign.startDate),"MMMM d, yyyy")}</TableCell>
                <TableCell>{format(new Date(campaign.endDate),"MMMM d, yyyy")}</TableCell>
                <TableCell>{campaign.audienceSegment.name}</TableCell>
                {/* <TableCell>{campaign.status}</TableCell> */}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

export default function CampaignManagement() {
    const [SegmentData, setSegmentData] = useState([]);
    const [CampaignsData, setCampaigns] = useState([]);
    useEffect(() => {
        const fetchData = async()=>{
          try {
              const [audienceresp,campaignresp] = await Promise.all([
                fetch("https://crm-t5jp.vercel.app/api/v1/audience/allsegments").then((res) => res.json()),
                fetch("https://crm-t5jp.vercel.app/api/v1/campaigns/allcampaigns").then((res) => res.json())
              ])
              setSegmentData(audienceresp);
              setCampaigns(campaignresp)
            //   setCustomers(customerresp.Customers)
          } catch (error) {
              console.log(error)
          }
        }
        fetchData()
      }, [])
  return (
    <div className="container mx-auto p-4 space-y-8">
      <h1 className="text-3xl font-bold">Campaign Management</h1>
      <Tabs defaultValue="create">
        <TabsList>
          <TabsTrigger value="create">Create Campaign</TabsTrigger>
          <TabsTrigger value="past">Past Campaigns</TabsTrigger>
        </TabsList>
        <TabsContent value="create">
          <CampaignCreationForm SegmentData={SegmentData}/>
        </TabsContent>
        <TabsContent value="past">
          <PastCampaignsPage CampaignsData={CampaignsData} />
        </TabsContent>
      </Tabs>
    </div>
  )
}