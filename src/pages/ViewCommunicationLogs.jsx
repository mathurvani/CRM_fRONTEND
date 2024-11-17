import React, { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination"
import { RefreshCw } from 'lucide-react'
import { toast } from '@/hooks/use-toast'
import { useParams } from 'react-router-dom'



const mockAudienceSegments= [
  { id: '1', name: 'High Spenders' },
  { id: '2', name: 'Frequent Visitors' },
  { id: '3', name: 'New Customers' },
]

const mockCommunicationLogs= [
  { id: '1', segmentId: '1', message: 'Exclusive offer for our top customers!', sentAt: '2023-06-15T10:30:00Z', recipientCount: 100 },
  { id: '2', segmentId: '1', message: 'Thank you for your continued loyalty.', sentAt: '2023-06-10T14:45:00Z', recipientCount: 95 },
  { id: '3', segmentId: '2', message: 'Don\'t miss our weekend sale!', sentAt: '2023-06-08T09:00:00Z', recipientCount: 250 },
  { id: '4', segmentId: '2', message: 'New items just arrived. Come check them out!', sentAt: '2023-06-05T11:15:00Z', recipientCount: 230 },
  { id: '5', segmentId: '3', message: 'Welcome to our community! Here\'s a special discount for you.', sentAt: '2023-06-01T16:00:00Z', recipientCount: 50 },
  { id: '6', segmentId: '3', message: 'How was your first purchase? We\'d love to hear your feedback!', sentAt: '2023-05-28T13:30:00Z', recipientCount: 45 },
]

export default function ViewCommunicationLogs({id}) {
  const [audienceSegments, setAudienceSegments] = useState([])
  const [selectedSegment, setSelectedSegment] = useState(id || '')
  const [communicationLogs, setCommunicationLogs] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const logsPerPage = 5
  const [isLoading, setisLoading] = useState(false)

  useEffect(() => {
    const fetchData = async()=>{
        try {
            const [audienceresp,logs] = await Promise.all([
              fetch("https://crm-t5jp.vercel.app/api/v1/audience/allsegments").then((res) => res.json()),
              fetch("https://crm-t5jp.vercel.app/api/v1/communication/alllogs",{
                method: "POST",
              }).then((res) => res.json())
            ])
            setAudienceSegments(audienceresp)
            setCommunicationLogs([...logs.logs, ...communicationLogs])
            setCurrentPage(logs.pagination.currentPage)
            // setCustomers(customerresp.Customers)
        } catch (error) {
            console.log(error)
        }
      }
      fetchData()
  }, [selectedSegment])

  console.log("eeer",communicationLogs)

  const handleSegmentChange = (segmentId) => {
    setSelectedSegment(segmentId)
    const filteredLogs = communicationLogs.filter(log => log.audienceId._id === segmentId)
    setCommunicationLogs(filteredLogs)
    setCurrentPage(1)
  }

  const fetchCommunicationLogs = async (segmentId) => {
    setisLoading(true)
    try {
      const response = await fetch("https://crm-t5jp.vercel.app/api/v1/communication/send")
    //   setCommunicationLogs(filteredLogs)
    //   setCurrentPage(1)
      toast({
        title: "Success",
        description: "Communication logs refreshed successfully.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch communication logs. Please try again.",
        variant: "destructive",
      })
    } finally {
      setisLoading(false)
    }
  }

  const handleRefresh = () => {
    if (selectedSegment) {
      fetchCommunicationLogs(selectedSegment)
    }
  }

  const indexOfLastLog = currentPage * logsPerPage
  const indexOfFirstLog = indexOfLastLog - logsPerPage
  const currentLogs = communicationLogs.slice(indexOfFirstLog, indexOfLastLog)

  const paginate = (pageNumber) => setCurrentPage(pageNumber)

  return (
    <div className="container mx-auto p-4 space-y-8">
      <h1 className="text-3xl font-bold">Segment Communication Logs</h1>

      <Card>
        <CardHeader>
          <CardTitle>Select Audience Segment</CardTitle>
        </CardHeader>
        <CardContent>
        <div className="flex space-x-4">
        <Select onValueChange={handleSegmentChange} value={selectedSegment}>
            <SelectTrigger className="w-[250px]">
              <SelectValue placeholder="Select an audience segment" />
            </SelectTrigger>
            <SelectContent>
              {audienceSegments.map((segment) => (
                <SelectItem key={segment._id} value={segment._id}>
                  {segment.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button onClick={handleRefresh} disabled={!selectedSegment}>
              <RefreshCw className="mr-2 h-4 w-4" />
              Refresh
            </Button>
            </div>
          
        </CardContent>
      </Card>

      {selectedSegment && (
        <Card>
          <CardHeader>
            <CardTitle>Communication Logs</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Message</TableHead>
                  <TableHead>Sent At</TableHead>
                  <TableHead>Recipient Name</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {communicationLogs.map((log) => (
                  <TableRow key={log._id}>
                    <TableCell>{log.message}</TableCell>
                    <TableCell>{new Date(log.createdAt).toLocaleString()}</TableCell>
                    <TableCell>{log.recipient.firstName + log.recipient.lastName }</TableCell>
                    <TableCell>{log.deliveryStatus}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <Pagination className="mt-4">
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious 
                    onClick={() => paginate(currentPage - 1)}
                    className={currentPage === 1 ? 'pointer-events-none opacity-50' : ''}
                  />
                </PaginationItem>
                {Array.from({ length: Math.ceil(communicationLogs.length / logsPerPage) }).map((_, index) => (
                  <PaginationItem key={index}>
                    <PaginationLink 
                      onClick={() => paginate(index + 1)}
                      isActive={currentPage === index + 1}
                    >
                      {index + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                <PaginationItem>
                  <PaginationNext 
                    onClick={() => paginate(currentPage + 1)}
                    className={currentPage === Math.ceil(communicationLogs.length / logsPerPage) ? 'pointer-events-none opacity-50' : ''}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </CardContent>
        </Card>
      )}
    </div>
  )
}