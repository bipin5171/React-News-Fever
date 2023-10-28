import React from "react";

const NewsItems =(props)=>{
  
    let {title,description,imageurl,newsurl,author,publishedAt,source}=props;
    return (
      <div className="my-3">
        <div className="card" style={{width:"18rem"}}>
        
          <img src={imageurl} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{title}...<span className="badge rounded-pill bg-danger">{source}</span></h5>
            
            <p className="card-text">
             {description}...
            </p>
            <p className="card-text"><small className="text-muted">By {!author? "Unknown" :author} on {new Date(publishedAt).toGMTString()}</small></p>
            <a href={newsurl} target="_blank" rel="noreferrer"className="btn btn-dark">
              read more
            </a>
          </div>
        </div>
      </div>
    );
  
}

export default NewsItems;
