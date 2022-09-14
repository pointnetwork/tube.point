function ShowComments({ data }) {
        console.log("its me",data)
       return(
       <div className="comment">
            <p className="address">
              {data[0].substring(0, 2) +
                " ... " +
                data[0].substring(data[0].length, data[0].length - 3)}
            </p>
            <p className="comment-details">{data[1]}</p>
          </div>)
}
export default ShowComments;
