import React, { useCallback, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import { PrismaClient } from '@prisma/client';
import { AuthContextProps, useAuth } from '../../auth/authContext'
import { PageHeader, buttonTW } from '../../styles/styles';
import BoardListItem from '../board-list/boardListItem';
import { Comment, Post, User } from '@prisma/client';
import { Profile as PrismaProfile} from '@prisma/client';
import { BoardData } from '../board-list/boardList';
import { UserRolez } from '../board/board';
import PostLink from '../post/postlink';
  
interface UserProfile {
    // id: number;
    // email: string;
    posts: Post[];
    profile: PrismaProfile;
    // username: string;
    // name: string;
    boards: BoardData[];
    comments: Comment[];
    roles: UserRolez[] | null;
    subscriptions: BoardData[];
    user: {
      email: string;
      id: number;
      name: string;
      password: string;
      userRole: UserRolez[];

    }
    };
const containerTW = 'container mx-auto p-4 b m-4 border-2 border-gray-600 bg-gray-800 rounded-lg';
const Profile = () => {
    // between 0 and 2
    const rand: number = Math.floor(Math.random() * 3);
    const { authenticated, user } = useAuth() as AuthContextProps
    const { name } = useParams();
    const [profile, setProfile] = useState<UserProfile | null>();
    // const [ userRole, setRole ] = useState<UserRolez | null>(null) 
    const [ userLoading, setUserLoading ] = useState<boolean>(true);
    const [ boardRoles, setBoardRoles ] = useState<UserRolez[] | null>(null);
    // const [ boardMap, setBoardMap ] = useState<Map<number, string> | null>(null);
    
    const getProfile = useCallback(async () => {
      let profileReq;
      try {
        if (name !== undefined) {
          profileReq = await axios.get(`/user/${name}`);
          setProfile(profileReq.data);
        }else if (user?.username){
          console.log(user.username)
          profileReq = await axios.get(`/user/${user.username}`);
          setProfile(profileReq.data);
        }else {
          console.log('no user')
        }
        if (profileReq){
          console.log(`profileReq is ,`, profileReq.data)
        }
      }
      catch (error){
        console.log('error', error)
      }
    // console.log('profile', profile)
    // console.log('profileReq', profileReq?.data)
      // const response = await axios.get(`/user/${name}`);
      // console.log('profile is ', response.data)
      // console.log('getprofile is ', getProfile.data)
      // setProfileState(getProfile.data);
      // console.log('boards', getProfile.data.boards)
        // console.log('profile', profile)
    }, [user]);
    useEffect(() => {
      getProfile();
      if (!user) {
        console.log('no user')
        return;
      }else{
        console.log(user)
      }

    }, [user, authenticated, name]);

    if (!authenticated){
      return <div>You are not logged in</div>
    }
    return (
        <div className={containerTW}>
        {profile ? <span className='text-3xl underline'>{profile.user.name}'s Profile</span> : <p>no profile</p>}
        <br></br>
        <span className='text-4xl'>Boards</span>
        {profile?.boards.map((board: any) => (
            <div key={board.name}>
              <BoardListItem key={board.id} board={board}></BoardListItem>
              {board && <p>123{board.name}</p>}
            </div>
          ))}

          <div className={containerTW}>
            <span className='text-4xl'>Subscriptions</span>
            {profile?.subscriptions.map((board: any) => (
              <div key={board.name}>
                <BoardListItem key={board.id} board={board}></BoardListItem>
                {board && <p>board name: {board.name}</p>}
              </div>
            ))}
          </div>
         
          <div className={containerTW}>
          <span className='text-4xl mn-'>Posts</span><br/><br/>
            {profile?.posts.map((post: any) => (
              <div key={post.id}>
                <Link className={buttonTW} to={`/board/${post.boardName}/post/${post.id}`}>{post.title}</Link>
                {post && <p className='m-4'>"{post.content}"</p>}
              </div>
            ))}
          </div>

           <div className={containerTW}>
           <span className='text-4xl'>Comments</span>
              {profile?.comments.map((comment: any) => (
                <div key={comment.id}>
                  <p>{comment.comment}</p>
                  {comment && <p>{comment.comment}</p>}
                </div>
              ))}
          </div>
          <div className={containerTW}>

          {}
          </div>
            
        </div>
    )
}
export default Profile;

// interface UserRolez = {
// id: number,
// userId: number,
// boardId: number,
// banned?: boolean,
// subscrubed?: boolean
// role?: Role,
// timeoutStart?: Date,
// TimeoutEnd?: Date,
// }