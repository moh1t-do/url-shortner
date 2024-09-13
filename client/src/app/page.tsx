'use client'
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { DataTable, Idata } from "@/components/dataTable";
import axiosInstance from "@/lib/axiosInstance";
import { useAuth } from "@/context/authContext";
import { useRouter } from "next/navigation";


const Home = () => {
  const [longUrl, setLongUrl] = useState<string>("");
  const [reload, setReload] = useState<boolean>(false);
  const [data, setData] = useState<Idata[]>([]);
  const router = useRouter();
  const { user, accessToken } = useAuth();
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (user == null)
      router.push('/signin');
    const payload = { url: longUrl };
    try {
      await axiosInstance.post('/short', payload, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });
      setLongUrl("");
      setReload(true);
    } catch (error) {

    }
  }

  const handleReload = () => {
    if (user)
      setReload(true);
  }

  useEffect(() => {
    const getShortUrl = async () => {
      try {
        const result = await axiosInstance.get<any>('/short', {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        });
        setData(result.data.allUrls);
        setReload(false);
      } catch (error) {

      }

    }
    getShortUrl();
  }, [reload, user, accessToken])

  return (
    <>
      <div className="flex flex-col items-center">
        <h2 className="my-10 sm:my-16 text-3xl sm:text-6xl lg:text-7xl  text-center font-extrabold">
          The only URL Shortener <br /> you&rsquo;ll ever need! 👇
        </h2>
        <form
          className="sm:h-14 flex flex-col sm:flex-row w-full md:w-2/4 gap-2"
          onSubmit={handleFormSubmit}
        >
          <Input
            type="url"
            placeholder="Enter your loooong URL"
            value={longUrl}
            onChange={(e) => setLongUrl(e.target.value)}
            className="h-full flex-1 py-4 px-4"
          />
          <Button type="submit" className="h-full" variant="destructive">
            Shorten!
          </Button>
        </form>
      </div>
      {user && <DataTable data={data} handleReload={handleReload} />}
    </>
  );
};

export default Home;