import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import TubeManager from "../services/TubeManager";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Comments = () => {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState();
  const { id: paramsId } = useParams();

  const commentCreateHandler = async (e) => {
    e.preventDefault();
    try {
      TubeManager.comment(comment, parseInt(paramsId)).then(function(_res){
        toast.success("Comment posted successfully", {
          position: "bottom-center",
        });
        loadComments(paramsId);
        setComment("");
      });

    } catch (error) {
      let er = error.message;
      er = er.replace("VM Exception while processing transaction: revert", "");
      toast.error(er, { position: "bottom-center" });
    }
  };

  const loadComments = async (id) => {
    try {
      TubeManager.getComments(id).then(async function (_data) {
        // setComments((comments) => [...comments, _data]);
        setComments(_data);
        console.log('comments',_data)
      });

    } catch (error) {
      console.log(error);
    } finally {
    }
  };

  useEffect(() => {
    loadComments(paramsId);
  }, []);

  return (
    <>
      <div className="comments-container">
        {comments !== undefined && comments.length > 0 && comments.map((_item, _index) => {
          return (
            <div className="comment" key={_index}>
              <p className="author">
                {_item[0].substring(0, 2) +
                  " ... " +
                  _item[0].substring(
                    _item[0].length,
                    _item[0].length - 3
                  )}
                  {/* TODO. change for identity name */}
              </p>
              {/* TODO. add post time (e.g. 20 minutes ago) */}
              <p>{_item[1]}</p>
            </div>
          )
        })}
      </div>

      <form onSubmit={commentCreateHandler}>
        <input
          type="text"
          placeholder="Add a comment..."
          className="add-comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <div className="text-end pt-2">
          <Button className="submit-comment" type="submit">
            Comment
          </Button>
        </div>
      </form>
    </>
  );
};

export default Comments;
