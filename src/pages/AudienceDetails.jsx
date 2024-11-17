import React,{useState,useEffect} from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useLocation, useParams } from 'react-router-dom'
const AudienceDetails = () => {
    const location = useLocation();
    const {id} = useParams();
    const [audienceCustomers, setAudienceCustomers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [customersCount, setcustomersCount] = useState(0)
    const audience = location.state?.audienceData;
    console.log("details",audience)
    useEffect(() => {
        const fetchAudienceCustomers = async () => {
            try {
                const response = await fetch(`https://crm-t5jp.vercel.app/api/v1/customers/retrieveSegment/${id}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch customers');
                }
                const data = await response.json();
                setAudienceCustomers(data);
                setcustomersCount(data.length) // Set fetched data
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchAudienceCustomers();
    }, [id]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }


  return (
    <div className='mx-auto p-4 space-y-8'>
         <Card>
    <CardHeader>
      <CardTitle>{audience.name} - Audience Details</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="mb-4">
        <p><strong>Description:</strong> {audience?.description}</p>
        {/* <p><strong>Conditions:</strong> {audience.conditions.totalSpending}</p> */}
        <p><strong>Customer Count:</strong> {customersCount || 0}</p>
      </div>
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
          {audienceCustomers.map((customer) => (
            <TableRow key={customer._id}>
              <TableCell>{customer.firstName + customer.lastName}</TableCell>
              <TableCell>{customer.email}</TableCell>
              <TableCell>Rs.{customer.totalSpending}</TableCell>
              <TableCell>{customer.visitCount || 0}</TableCell>
              <TableCell>{customer.lastVisitDate}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </CardContent>
  </Card>

    </div>
   
  )
}

export default AudienceDetails