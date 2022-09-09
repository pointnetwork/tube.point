import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import TubeManager from "../services/TubeManager";
import { useRoute } from "wouter";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Comments = () => {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [match, params] = useRoute("/video-detail/:id");

  const commentCreateHandler = async (e) => {
    e.preventDefault();
    try {
      await TubeManager.comment(comment, parseInt(params.id));
      toast.success("Comment posted successfully", {
        position: "bottom-center",
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
        setComments((comments) => [...comments, _data]);
      });
    } catch (error) {
      console.log(error);
    } finally {
    }
  };

  useEffect(() => {
    loadComments(params.id);
  }, []);

  return (
    <>
      <div className="comment-container">
        <div className="show-comments">
          {comments[0] !== undefined &&
            comments[0].length > 0 &&
            comments[0].map((_item) => {
              return (
                <>
                  <div className="comment">
                    <p className="address">
                      {_item[0].substring(0, 2) +
                        " ... " +
                        _item[0].substring(
                          _item[0].length,
                          _item[0].length - 3
                        )}
                    </p>
                    <p className="comment-details">{_item[1]}</p>
                  </div>
                </>
              );
            })}
        </div>

        <form onSubmit={commentCreateHandler}>
          <div className="add-a-comment">
            <input
              type="text"
              placeholder="Add a comment..."
              className="w-100"
              onChange={(e) => setComment(e.target.value)}
            />
          </div>
          <div className="text-end pt-2">
            <Button variant="light" className="me-2">
              Cancel
            </Button>
            <Button variant="success" type="submit">
              Comment
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Comments;
