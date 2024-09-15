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
import { useEffect, useState } from "react";
import axiosInstance, { SERVER_URL } from "@/lib/axiosInstance";
import { useAuth } from "@/context/authContext";
import { CopyToClipboard } from 'react-copy-to-clipboard';
import Link from "next/link";
import { Copy, Trash } from "lucide-react";
import { Input } from "@/components/ui/input";

export interface Idata {
  _id: string,
  urlTitle: string,
  shortId: string,
  redirectUrl: string,
  visitHistory: number[],
  createdBy: string,
  createdAt: Date,
  updatedAt: Date
}

interface IDataTable {
  data: Idata[];
  handleReload: () => void
};

export const DataTable = (props: IDataTable) => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filteredUrls, setFilteredUrls] = useState<null | Idata[]>(null);
  const { accessToken } = useAuth();
  const { data, handleReload } = props;

  const handleDelete = async (id: string) => {
    try {
      await axiosInstance.delete(`/short/${id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });
      handleReload();
    } catch (error) {

    }
  }

  useEffect(() => {
    setSearchQuery('');
  }, [data])

  useEffect(() => {
    const filteredUrls = () => data?.filter((url) =>
      url.urlTitle.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const filterResult = filteredUrls();
    if (filterResult.length > 0)
      setFilteredUrls(filterResult)
    else
      setFilteredUrls(null);

  }, [searchQuery])

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
      <Input
        type="text"
        placeholder="Filter Links..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)} />
      <div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Short Url</TableHead>
              <TableHead>Created At</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {(filteredUrls || data).map((item) => (
              <TableRow key={item._id}>
                <TableCell>{item.urlTitle}</TableCell>
                <TableCell className="font-medium">
                  <Link legacyBehavior href={`${SERVER_URL}/redirect/${item.shortId}`} passHref>
                    <a target="_blank" rel="noopener noreferrer">
                      {item.shortId}
                    </a>
                  </Link>
                </TableCell>
                <TableCell>{(new Date(item.createdAt)).toDateString()}</TableCell>
                <TableCell>
                  <div className="flex gap-2 items-center flex-col md:flex-row">
                    <Button onClick={() => handleDelete(item._id)}>
                      <Trash />
                    </Button>
                    <CopyToClipboard text={`${SERVER_URL}/redirect/${item.shortId}`}>
                      <Button><Copy /></Button>
                    </CopyToClipboard>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};