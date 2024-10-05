import { Article, User, Comment } from "@prisma/client";
import { Dispatch, SetStateAction } from "react";

export interface ArticleItemProps {
  article: Article;
}

export interface articlesPageProps {
  searchParams: {
    pageNumber: string;
  };
}

export interface paginationPageProps {
  pages: number;
  pageNumber: number;
  route: string;
}

export interface createArticleDTO {
  title: string;
  decription: string;
}

export interface registerNewUserDTO {
  username: string;
  email: string;
  password: string;
}

export interface commentDTO {
  text: string;
  articleId: number;
}

export interface updateCommentProps {
  params: {
    id: string;
  };
}

export interface updateCommentDTO {
  text: string;
}

export interface updateArticleDTO {
  title?: string;
  decription?: string;
}

export interface getSingleArticleProps {
  params: {
    id: string;
  };
}

export interface getProfileProps {
  params: {
    id: string;
  };
}

export interface updateProfileDTO {
  username?: string;
  email?: string;
  password?: string;
}

export interface updateCommentDTO {
  text: string;
}

export interface loginUserDTO {
  email: string;
  password: string;
}

export interface commentItemProps {
  comment: commentWithUser;
  userId: number | undefined;
}

export interface addCommentFormProps {
  articleId: number;
}

export interface updateCommentModelProps {
  setOpen: Dispatch<SetStateAction<boolean>>;
  commentId: number;
  commentText: string;
}

export interface adminArticlesPageProps {
  searchParams : {
    pageNumber : string
  }
}

export interface navBarPageProps {
  isAdmin : boolean
}

export interface AdminArticlesTableProps { 
  articles : Article[] ,
}

export interface updateArticlePageProps {
  params : {
    id : string
  }
}

export interface updateArticleFormProps {
  article : Article
}

export interface updateCommentFormProps {
  comment : Comment
}

export interface deleteArticleButtonProps {
  article : Article
}

export interface deleteCommentsButtonProps {
  comment : Comment ,
}

export interface CommentsTablePageProps {
  comments : Comment[] ,
}

export interface updateCommentPageProps {
  params : {
    id : string
  }
}


export type JWTPayload = {
  id: number;
  username: string;
  isadmin: boolean;
};

export type commentWithUser = Comment & { user: User };

export type articleWithComments = Article & { comments: commentWithUser[] };
