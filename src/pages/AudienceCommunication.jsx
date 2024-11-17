import React, { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {toast} from "@/hooks/use-toast"
import axios from 'axios'

// Mock data and types


const mockAudienceSegments= [
  { id: '1', name: 'High Spenders' },
  { id: '2', name: 'Frequent Visitors' },
  { id: '3', name: 'New Customers' },
]

const mockCustomers = {
  '1': [
    { id: '1', name: 'John Doe', email: 'john@example.com' },
    { id: '2', name: 'Jane Smith', email: 'jane@example.com' },
  ],
  '2': [
    { id: '3', name: 'Bob Johnson', email: 'bob@example.com' },
    { id: '4', name: 'Alice Brown', email: 'alice@example.com' },
  ],
  '3': [
    { id: '5', name: 'Charlie Davis', email: 'charlie@example.com' },
    { id: '6', name: 'Eva Wilson', email: 'eva@example.com' },
  ],
}

export default function AudienceCommunication() {
  const [audienceSegments, setAudienceSegments] = useState([])
  const [selectedSegment, setSelectedSegment] = useState('')
  const [customers, setCustomers] = useState([])
  const [message, setMessage] = useState('')

  useEffect(() => {

    const fetchData = async()=>{
        try {
            const [audienceresp,customerresp] = await Promise.all([
              fetch("http://localhost:4000/api/v1/audience/allsegments").then((res) => res.json()),
              fetch("http://localhost:4000/api/v1/customers/retrieve").then((res) => res.json())
            ])
            setAudienceSegments(audienceresp)
            // setCustomers(customerresp.Customers)
        } catch (error) {
            console.log(error)
        }
      }
      fetchData()
  }, [])

  const handleSegmentChange = (segmentId) => {
    setSelectedSegment(segmentId)
    const fetchData = async()=>{
        try {
            const [customerresp] = await Promise.all([
              fetch(`http://localhost:4000/api/v1/customers/retrieveSegment/${segmentId}`).then((res) => res.json())
            ])
            setCustomers(customerresp)
            // setCustomers(customerresp.Customers)
        } catch (error) {
            console.log(error)
        }
      }
      fetchData()
    // Simulating API call to fetch customers for the selected segment
  }

  const handleSendMessage = async (e) => {
    e.preventDefault()
    console.log("message",message)
    console.log("ortintib",selectedSegment)
    // if (!selectedSegment || !message.trim()) {
    //   toast({
    //     title: "Error",
    //     description: "Please select an audience segment and enter a message.",
    //     variant: "destructive",
    //   })
    //   return
    // }

    // Simulating API call to save communication log and send messages
    try {


      const response = await axios.post("http://localhost:4000/api/v1/communication/saveAudienceData",{
        audienceId: selectedSegment,
        message: message
      })
    // const response = await fetch("http://localhost:4000/api/v1/communication/saveAudienceData", {
    //         method: "POST",
    //         headers: {
    //           "Content-Type": "application/json",
    //         },
    //         body: JSON.stringify({
    //           audienceId: selectedSegment, // Replace with your selected audience ID
    //           message: message, // Use the message input value
    //         }),
    //       });
        
          // if (!response.ok) {
          //   throw new Error("Failed to send message");
          // }
    //   await new Promise(resolve => setTimeout(resolve, 1000)) // Simulating API delay
      toast({
        title: "Success",
        description: `Message sent to ${customers.length} customers in the "${audienceSegments.find(seg => seg._id === selectedSegment)?.name}" segment.`,
      })
      setMessage('')
    } catch (error) {
      console.log(error)
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="container mx-auto p-4 space-y-8">
      <h1 className="text-3xl font-bold">Audience Communication</h1>

      <Card>
        <CardHeader>
          <CardTitle>Select Audience Segment</CardTitle>
        </CardHeader>
        <CardContent>
          <Select onValueChange={handleSegmentChange} value={selectedSegment}>
            <SelectTrigger>
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
        </CardContent>
      </Card>

      {selectedSegment && (
        <Card>
          <CardHeader>
            <CardTitle>Customers in Selected Segment</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {customers.map((customer) => (
                  <TableRow key={customer._id}>
                    <TableCell>{customer.firstName + customer.lastName}</TableCell>
                    <TableCell>{customer.email}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Send Personalized Message</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSendMessage} className="space-y-4">
            <div>
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                placeholder="Enter your personalized message here"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={4}
              />
            </div>
            <Button type="submit" disabled={!selectedSegment}>
              Send Message
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}