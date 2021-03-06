import React from "react";
import { Link } from "react-router-dom";

export default ({ item = null }) => {
  if (!item) return null;

  return (
    <div className="card medium col s4 m4 l4">
      <div className="card-content">
        <div>
          <img
            src={item.imageUrl}
            alt="product"
            className="responsive-img hoverable center-block"
            style={{ width: "75%", height: "75%", maxHeight: "256px" }}
            onClick={() => window.open(item.productUrl, "_blank")}
          />
        </div>
        <div className="bottom">
          <table className="responsive-table">
            <tbody>
              <tr>
                <td>{item.price}</td>
              </tr>
              <tr>
                <td>
                  <Link to={`/product/${item.id}`}>{item.name}</Link>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
