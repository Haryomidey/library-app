import React, { useEffect, useState } from 'react'
import { GetComments, PostComment } from './admin/AdminControllers';
import timeAgo from '../utils/time-converter';
import { FaUser } from 'react-icons/fa';

const CommentContainer = ({ topic_id }: any) => {
  const [comments, setComments] = useState<any[]>([]);
  const [newComment, setNewComment] = useState<string>("");
  const [isPostingMainComment, setIsPostingMainComment] = useState<boolean>(false);
  const [isReplyingComment, setIsReplyingComment] = useState<boolean>(false)
  const [replyingCommentId, setReplyingCommentId] = useState<string | null>(null);
  const [replyText, setReplyText] = useState<string>("");

  useEffect(() => {
      const fetchComments = async () => {
        try {
          const data = await GetComments(topic_id);
          console.log('Fetched comments:', topic_id);
          setComments(data.data || []);
        } catch (error) {
          console.error('Error fetching comments:', error);
        }
      };
      fetchComments();
  }, [topic_id]);
  
  const handleCommentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setNewComment(event.target.value);
  };

  const handleReplyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setReplyText(event.target.value);
  };

  const handleCommentSubmit = async () => {
      if(newComment !== ""){
        setIsPostingMainComment(true);
      const formData = new FormData();
      formData.append("topic_id", topic_id);
      formData.append("school_id", "1");
      formData.append("type", "main");
      formData.append("comment", newComment);
      formData.append("comment_id", "");
    
      try {
        const data = await PostComment(formData);
        console.log('Posted comment:', data);
        setComments([...comments, data]);
        setNewComment("");
        setIsReplyingComment(false);
      } catch (error) {
        console.error("Error posting comment:", error);
      } finally {
        setIsPostingMainComment(false);
      }
      }
  };

  const handleCancelComment = () => {
    setNewComment("")
  }

  const handleReplySubmit = async (commentId: string) => {
    if(replyText !== ''){
      setIsReplyingComment(true)
      const formData = new FormData();
      formData.append("topic_id", topic_id);
      formData.append("school_id", "1");
      formData.append("type", "reply");
      formData.append("comment", replyText);
      formData.append("comment_id", commentId);
    
      try {
        const data = await PostComment(formData);
        console.log('Posted reply:', data);
        setComments(comments.map(comment => 
          comment.comment_id === commentId 
            ? { ...comment, replies: [...(comment.replies || []), data] }
            : comment
        ));
        setReplyText("");
        setReplyingCommentId(null);
        setIsReplyingComment(false)
      } catch (error) {
        console.error("Error posting reply:", error);
      }
    }
  };

    return (
        <div className='mt-5'>
            <h2 className='font-semibold text-xl'>{comments.length} Comments</h2>
            <div className='flex flex-col gap-4'>
              <div className='mt-3 flex gap-4'>
                <div className='min-w-12 h-12 rounded-full grid place-items-center shadow-md bg-[#eeeded]'>
                  <FaUser />
                </div>
                <div className="w-full">
                  <input 
                    type="text"
                    placeholder="Do you have a question or comment? Drop it here..."
                    value={newComment}
                    onChange={handleCommentChange}
                    className="w-full border-b border-[black] px-2 bg-transparent"
                  />
                  <div className="w-full flex items-center justify-end mt-3">
                    <button className="px-5 py-2 rounded-full" onClick={handleCancelComment}>Cancel</button>
                    <button 
                      onClick={handleCommentSubmit}
                      className="px-5 py-2 rounded-full bg-[#3471E1] text-white"
                    >
                      {isPostingMainComment ? 'Commenting...' : 'Comment'}
                    </button>
                  </div>
                </div>
              </div>

              {comments && comments.map((comment, index) => (
                <div key={index} className="flex flex-col gap-4 border-b pb-6">
                  <div className='mt-3 flex gap-4'>
                    <div className='min-w-12 h-12 rounded-full grid place-items-center shadow-md bg-[#eeeded]'>
                      <FaUser />
                    </div>
                    <div>
                      <p>
                        <span className='font-semibold mr-1'>{comment.user_name}</span> 
                        <span className='text-[gray] text-sm'>
                          {comment.created_at ? timeAgo(comment.created_at) : 'Date not available'}
                        </span>
                      </p>
                      <p className='text-sm'>{comment.comment}</p>

                      <button 
                        className="text-blue-500 text-sm"
                        onClick={() => {
                          setIsReplyingComment(true)
                          setReplyingCommentId(replyingCommentId === comment.comment_id ? null : comment.comment_id)
                        }}
                      >
                        Reply
                      </button>

                      {isReplyingComment && replyingCommentId === comment.comment_id && (
                        <div className="mt-3 flex gap-4">
                          <div className='min-w-12 h-12 rounded-full grid place-items-center shadow-md bg-[#eeeded]'>
                            <FaUser />
                          </div>
                          <div className="w-full">
                            <input 
                              type="text"
                              placeholder="Write a reply..."
                              value={replyText}
                              onChange={handleReplyChange}
                              className="w-full border-b border-[black] px-2 bg-transparent"
                            />
                            <div className="w-full flex items-center justify-end mt-3">
                              <button 
                                className="px-5 py-2 rounded-full"
                                onClick={() => {
                                  setReplyingCommentId(null)
                                  setReplyText("")
                                  setIsReplyingComment(false)
                                }}
                              >
                                Cancel
                              </button>
                              <button 
                                onClick={() => handleReplySubmit(comment.comment_id)}
                                className="px-5 py-2 rounded-full bg-[#3471E1] text-white"
                              >
                                Reply
                              </button>
                            </div>
                          </div>
                        </div>
                      )}

                      {comment.replies && comment.replies.map((reply: any, replyIndex: number) => (
                        <div key={replyIndex} className="mt-3 flex gap-4 ml-12">
                          <div className='min-w-12 h-12 rounded-full grid place-items-center shadow-md bg-[#eeeded]'>
                            <FaUser />
                          </div>
                          <div>
                            <p>
                              <span className='font-semibold mr-1'>{reply.user_name}</span> 
                              <span className='text-[gray] text-sm'>
                                {reply.created_at ? timeAgo(reply.created_at) : 'Date not available'}
                              </span>
                            </p>
                            <p className='text-sm'>{reply.comment}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}

            </div>
        </div>
    )
}

export default CommentContainer
