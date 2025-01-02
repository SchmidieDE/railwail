import api from "@/lib/api";
import { AIImage } from "@/types/aimodel";
import { AIAudio } from "@/types/aimodel";
import { AIVideo } from "@/types/aimodel";
import { User } from "@/types/user";
import { useEffect } from "react";
import { useState } from "react";
import { ImageGenerated } from "../comp/GeneratedFiles";
import { AudioGenerated, VideoGenerated } from "../comp/GeneratedFiles";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { H1, H2 } from "@/components/custom/textFields";
import { toast } from "@/hooks/use-toast";
import { z } from "zod";
import LoadingSpinner from "@/components/custom/loadingSpinner";
import { Label } from "@/components/ui/label";

const userSchema = z.object({
  first_name: z.string().optional(),
  last_name: z.string().optional(),
  username: z.string().nullable().optional(),
  email: z.string().email("Invalid email address"),
});

const Account = () => {


  const [user, setUser] = useState<{user: User, images: AIImage[], videos: AIVideo[], audios: AIAudio[]} | null>(null);
  

  const handleUpdateUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      // Validate user data
      const validUserData = userSchema.parse(user?.user);

      const resp = await api.put('/user/', validUserData);
      if (resp.ok) {
        toast({
          title: "User updated",
          description: "Your user information has been updated",
        });
      } else {
        toast({
          title: "Error",
          description: "Something went wrong during the user information update",
          variant: "destructive",
        });
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        // Handle validation errors
        const errorMessages = error.errors.map(err => err.message).join(", ");
        toast({
          title: "Validation Error",
          description: errorMessages,
          variant: "destructive",
        });
      } else {
        // Handle other errors
        toast({
          title: "Error",
          description: "An unexpected error occurred",
          variant: "destructive",
        });
      }
    }
  };
  

  useEffect(() => {
    
    (async () => {
      // get the information from the user 
      const respUser = await api.get('/user/');
      const user = await respUser.json();
      // get the information from the images, videos,
      const respGenerated = await api.get('/ai/generated-files/');
      const generated = await respGenerated.json();
      setUser({user, images: generated.images, videos: generated.videos, audios: generated.audios});
    })();
  }, []);


  const baseUrl = `${import.meta.env.VITE_SUPABASE_BASE_URL}/user_${user?.user.id}/`;


  


  
  return (
    <div className="flex flex-col gap-4 px-5">
      <H1>Account</H1>
      <form className="flex flex-col gap-4" onSubmit={handleUpdateUser}>
        <div className="flex gap-2">
          <div className="flex flex-col gap-2 w-full">
            <Label>Firstname</Label>
            <Input placeholder="firstname" value={user?.user.first_name} onChange={(e) => {
              setUser({...user, user: {...user?.user, first_name: e.target.value}});
            }} />
          </div>
          <div className="flex flex-col gap-2 w-full">
            <Label>Lastname</Label>
            <Input placeholder="lastname" value={user?.user.last_name} onChange={(e) => {
              setUser({...user, user: {...user?.user, last_name: e.target.value}});
            }} />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <Label>Username</Label>
          <Input placeholder="username" value={user?.user.username} onChange={(e) => {
            setUser({...user, user: {...user?.user, username: e.target.value}});
          }} />
          <Label>Email</Label>
          <Input placeholder="myemail@gmail.com" value={user?.user.email} onChange={(e) => {
            setUser({...user, user: {...user?.user, email: e.target.value}});
          }} />
        </div>
        <Button type="submit" className="w-fit text-white ml-auto">Save</Button>
      </form>
      <H2>Images</H2> 
      <div className="my-2 flex flex-row gap-2 overflow-x-auto scrollbar-thin scrollbar-thumb-primary scrollbar-track-secondary overflow-y-hidden pb-4">
        {
          !user?.images ? (
            <LoadingSpinner />
          ) : user.images.length === 0 ? (
            <p>No images have been generated</p>
          ) : (
            user.images.map((image, index) => (
              <ImageGenerated key={index} image={baseUrl + image.url} index={index} />
            ))
          )
        }
      </div>
      <H2>Videos</H2>
      <div className="my-2 flex flex-row gap-2 overflow-x-auto scrollbar-thin scrollbar-thumb-primary scrollbar-track-secondary overflow-y-hidden pb-4">
        {
          !user?.videos ? (
            <LoadingSpinner />
          ) : user.videos.length === 0 ? (
            <p>No videos have been generated</p>
          ) : (
            user.videos.map((video, index) => (
              <VideoGenerated key={index} video={baseUrl + video.url} index={index} />
            ))
          )
        }
      </div>
      <H2>Audios</H2>
      <div className="my-2 flex flex-row gap-2 overflow-x-auto scrollbar-thin scrollbar-thumb-primary scrollbar-track-secondary overflow-y-hidden pb-4">
        {
          !user?.audios ? (
            <LoadingSpinner />
          ) : user.audios.length === 0 ? (
            <p>No audio files have been generated</p>
          ) : (
            user.audios.map((audio, index) => (
              <AudioGenerated key={index} audio={baseUrl + audio.url} index={index} />
            ))
          )
        }
      </div>
    </div>
  )
}

export default Account;