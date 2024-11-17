import React, { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from '@/components/ui/textarea'
import { useSelector } from 'react-redux';
import {createSegment} from "@/services/operations/apis"
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { CalendarIcon } from 'lucide-react'
import { format } from "date-fns"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
// Mock data
const mockAudiences = [
  { id: 1, name: "High Spenders", conditions: "totalSpending > 1000", customerCount: 500 },
  { id: 2, name: "Frequent Visitors", conditions: "visitCount > 10", customerCount: 1000 },
  { id: 3, name: "Recent Customers", conditions: "lastVisitDate > 2023-01-01", customerCount: 750 },
]

const mockCustomers = [
  { id: 1, name: "John Doe", email: "john@example.com", totalSpending: 1500, visitCount: 15, lastVisitDate: "2023-06-01" },
  { id: 2, name: "Jane Smith", email: "jane@example.com", totalSpending: 800, visitCount: 8, lastVisitDate: "2023-05-15" },
  { id: 3, name: "Bob Johnson", email: "bob@example.com", totalSpending: 2000, visitCount: 20, lastVisitDate: "2023-06-10" },
  // Add more mock customers as needed
]







const AudienceCreationForm = () => {
    const dispatch = useDispatch()
    const [conditions, setConditions] = useState([{ field: '', operator: '', value: '', valueType: 'string' }])

    const addCondition = () => {
      setConditions([...conditions, { field: '', operator: '', value: '', valueType: 'string' }])
    }
  const [audienceSize, setAudienceSize] = useState(0);
    const [segmentName, setSegmentName] = useState("");
    const [description, setDescription] = useState("");
    const user = useSelector((state) => state.auth.signupData);


console.log("printinguser",user)

const updateCondition = (index, key, value) => {
    const newConditions = [...conditions]
    newConditions[index][key] = value
    if (key === 'field') {
      newConditions[index].valueType = value === 'lastVisitDate' ? 'date' : 'number'
    }
    setConditions(newConditions)
  }

  const removeCondition = (index) => {
    const updatedConditions = conditions.filter((_, i) => i !== index);
    setConditions(updatedConditions);
  };

  
  
  const handleSubmit = (e)=>{
    e.preventDefault();
    const transformedConditions = conditions.reduce((acc, condition) => {
        const { field, operator, value } = condition;
    
        if (!field || !operator || !value) {
          console.error("Missing field, operator, or value in condition:", condition);
          return acc;
        }
    
        // Dynamically set the operator as the key
        acc[field] = { [operator]: value };
        return acc;
      }, {});
    console.log({ segmentName, description, transformedConditions })
    dispatch(createSegment(segmentName,description,transformedConditions))
    // removeCondition()
    // setDescription('');
    // setSegmentName('')
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create New Audience Segment</CardTitle>
      </CardHeader>
      <CardContent>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <Label htmlFor="segmentName">Segment Name</Label>
            <Input id="segmentName" placeholder="Enter segment name" value={segmentName} 
            onChange={(e) => setSegmentName(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea 
              id="description" 
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter segment description" 
            />
          </div>
  {conditions.map((condition, index) => (
            <div key={index} className="flex space-x-2">
              <Select onValueChange={(value) => updateCondition(index, 'field', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select field" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="totalSpending">Total Spending</SelectItem>
                  <SelectItem value="visitCount">Visit Count</SelectItem>
                  <SelectItem value="lastVisitDate">Last Visit Date</SelectItem>
                </SelectContent>
              </Select>
              <Select onValueChange={(value) => updateCondition(index, 'operator', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select operator" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value=">">&gt;</SelectItem>
                  <SelectItem value=">=">&gt;=</SelectItem>
                  <SelectItem value="<">&lt;</SelectItem>
                  <SelectItem value="<=">&lt;=</SelectItem>
                  <SelectItem value="=">=</SelectItem>
                  <SelectItem value="!=">!=</SelectItem>
                </SelectContent>
              </Select>
              {condition.valueType === 'date' ? (
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={`w-[180px] justify-start text-left font-normal ${!condition.value && "text-muted-foreground"}`}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {condition.value ? format(new Date(condition.value), "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={condition.value ? new Date(condition.value) : undefined}
                      onSelect={(date) => updateCondition(index, 'value', date ? date.toISOString() : '')}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              ) : (
                <Input 
                  placeholder="Enter value" 
                  value={condition.value}
                  onChange={(e) => updateCondition(index, 'value', e.target.value)}
                  type={condition.valueType === 'number' ? 'number' : 'text'}
                />
              )}
            </div>
          ))}
          <Button type="button" variant="outline" onClick={addCondition}>+ Add Condition</Button>
          <div className="flex space-x-2">
            {/* <Button type="button">Preview Audience</Button> */}
            <Button type="submit">Save Segment</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}

const AudienceListPage = ({audiences}) => {
  const navigate = useNavigate();
    console.log("audience",audiences)
  return (
    <Card>
      <CardHeader>
        <CardTitle>Audience Segments</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Segment Name</TableHead>
              <TableHead>Descriptions</TableHead>
              <TableHead>Logs</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {audiences?.map((audience) => (
              <TableRow key={audience._id}>
                <TableCell>{audience.name}</TableCell>
                <TableCell>{audience.description}</TableCell>
                {/* <TableCell>{audience.conditions.totalSpending}</TableCell>
                <TableCell>{audience.description}</TableCell> */}
                {/* <TableCell>{audience.customerCount}</TableCell> */}
                <TableCell>
                  <Button variant="outline" size="sm" onClick = {()=>navigate('/logs')}>View Logs</Button>
                </TableCell>

                <TableCell>
                  <Link to={`/audience/${audience._id}`} state={{ audienceData: audience }}>
                    <Button variant="outline" size="sm">View Details</Button>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

const CustomerListPage = ({customerData}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Customer List</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Total Spending</TableHead>
              <TableHead>Visit Count</TableHead>
              <TableHead>Last Visit Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {customerData.map((customer) => (
              <TableRow key={customer._id}>
                <TableCell>{customer.firstName + customer.lastName}</TableCell>
                <TableCell>{customer.email}</TableCell>
                <TableCell>Rs.{customer.totalSpending}</TableCell>
                <TableCell>{customer.visitCount}</TableCell>
                <TableCell>{customer.lastVisitDate}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {/* Add pagination controls here */}
      </CardContent>
    </Card>
  )
}

export default function AudienceManagement() {
    const [audiences, setAudiences] = useState([]);
    const [customers, setCustomers] = useState([]);
    useEffect(() => {
        const fetchData = async()=>{
          try {
              const [audienceresp,customerresp] = await Promise.all([
                fetch("https://crm-t5jp.vercel.app/api/v1/audience/allsegments").then((res) => res.json()),
                fetch("https://crm-t5jp.vercel.app/api/v1/customers/retrieve").then((res) => res.json())
              ])
              setAudiences(audienceresp);
              setCustomers(customerresp.Customers)
          } catch (error) {
              console.log(error)
          }
        }
        fetchData()
      }, [])
    
      console.log("printing",customers)
  return (
    <div className="container mx-auto p-4 space-y-8">
      <h1 className="text-3xl font-bold">Audience Management</h1>
      <Tabs defaultValue="create">
        <TabsList>
          <TabsTrigger value="create">Create Audience</TabsTrigger>
          <TabsTrigger value="list">Audience List</TabsTrigger>
          <TabsTrigger value="customers">Customer List</TabsTrigger>
        </TabsList>
        <TabsContent value="create">
          <AudienceCreationForm />
        </TabsContent>
        <TabsContent value="list">
          <AudienceListPage audiences={audiences} />
        </TabsContent>
        <TabsContent value="customers">
          <CustomerListPage customerData={customers} />
        </TabsContent>
      </Tabs>
    </div>
  )
}