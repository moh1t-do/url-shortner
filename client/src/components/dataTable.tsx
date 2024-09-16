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
import { IUrldata } from "@/interface/url";

interface IDataTable {
  data: IUrldata[];
  handleReload: () => void
};

export const DataTable = (props: IDataTable) => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filteredUrls, setFilteredUrls] = useState<IUrldata[]>([]);
  const [totalClicks, setTotalCLicks] = useState<number>(0);
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

  const generateTable = (tableData: IUrldata[]) => {
    return (<Table>
      <TableHeader>
        <TableRow>
          <TableHead>Title</TableHead>
          <TableHead>Short Url</TableHead>
          <TableHead>Created At</TableHead>
          <TableHead>Clicks</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {tableData.map((item) => (
          <TableRow key={item._id}>
            <TableCell>{item.urlTitle}</TableCell>
            <TableCell className="font-medium" onClick={handleReload}>
              <Link legacyBehavior href={`${SERVER_URL}/redirect/${item.shortId}`} passHref>
                <a target="_blank" rel="noopener noreferrer">
                  {item.shortId}
                </a>
              </Link>
            </TableCell>
            <TableCell>{(new Date(item.createdAt)).toLocaleDateString('en-GB')}</TableCell>
            <TableCell>{item.visitHistory.length}</TableCell>
            <TableCell>
              <div className="flex gap-2 items-center justify-start">
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
    </Table>);
  }

  useEffect(() => {
    setSearchQuery('');
    const totalVisitHistoryLength = data.reduce((total, item) => {
      return total + item.visitHistory.length;
    }, 0);
    setTotalCLicks(totalVisitHistoryLength);
  }, [data])

  useEffect(() => {
    const filteredUrls = () => data?.filter((url) =>
      url.urlTitle.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const filterResult = filteredUrls();
    if (filterResult.length > 0)
      setFilteredUrls(filterResult)
    else
      setFilteredUrls([]);

  }, [searchQuery])

  return (
    <div className="flex flex-col gap-8">
      <div className="grid sm:grid-rows-1 sm:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Links Created</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{data?.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Total Clicks</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{totalClicks}</p>
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
        {searchQuery.length > 0 && generateTable(filteredUrls)}
        {searchQuery.length == 0 && generateTable(data)}
      </div>
    </div >
  );
};