'use client'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "./ui/button";
import axios from "axios";
import { useAuth } from "@/context/authContext";
import Link from "next/link";

export interface Idata {
  _id: string,
  shortId: string,
  redirectUrl: string,
  visitHistory: Date[],
  createdBy: string,
  createdAt: Date,
  updatedAt: Date
}

interface IDataTable {
  data: Idata[];
  handleReload: () => void
};

export const DataTable = (props: IDataTable) => {
  const { accessToken } = useAuth();
  const { data, handleReload } = props;

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`http://localhost:8000/api/v1/short/${id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });
      handleReload();
    } catch (error) {

    }
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="grid gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Links Created</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{data?.length}</p>
          </CardContent>
        </Card>
      </div>
      <div className="flex justify-between">
        <h1 className="text-4xl font-extrabold">My Links</h1>
      </div>
      <div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Short Url</TableHead>
              <TableHead>Created At</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((item) => (
              <TableRow key={item._id}>
                <TableCell className="font-medium">
                  <Link legacyBehavior href={`http://localhost:8000/api/v1/redirect/${item.shortId}`} passHref>
                    <a target="_blank" rel="noopener noreferrer">
                      {item.shortId}
                    </a>
                  </Link>
                </TableCell>
                <TableCell>{new Date(item.createdAt).toString()}</TableCell>
                <TableCell>
                  <Button onClick={() => handleDelete(item._id)}>
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div >
  );
};