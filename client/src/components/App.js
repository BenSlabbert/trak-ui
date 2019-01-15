import React, { Component } from 'react';

class App extends Component {

  render() {
    return <div className='container'>
      <nav>
        <div className='nav-wrapper'>
          <a href='/' className='brand-logo'>Trak</a>
          <ul id='nav-mobile' className='right'>
            <li><a href='/latest'>Latest</a></li>
          </ul>
        </div>
      </nav>

      <div className='row'>

        <h5>Latest</h5>

        <div className='row'>
          <div className='col s3 m3 l3'>
            <div className='card-panel grey lighten-5 z-depth-1'>
              <div className='row valign-wrapper'>
                <div className='col s6 m6 l6'>
                  <img
                      src='https://media.takealot.com/covers_tsins/55927403/55927403-1-pdpxl.jpg'
                      alt=''
                      className='circle responsive-img'
                  />
                </div>
                <div className='col s6 m6 l6'>
              <span className='black-text'>
                This is a square image. Add the 'circle' class to it to make it appear circular.
              </span>
                </div>
              </div>
            </div>
          </div>

          <div className='col s3 m3 l3'>
            <div className='card-panel grey lighten-5 z-depth-1'>
              <div className='row valign-wrapper'>
                <div className='col s6 m6 l6'>
                  <img
                      src='https://media.takealot.com/covers_tsins/55927403/55927403-1-pdpxl.jpg'
                      alt=''
                      className='circle responsive-img'
                  >
                  </img>
                </div>
                <div className='col s6 m6 l6'>
              <span className='black-text'>
                This is a square image. Add the 'circle' class to it to make it appear circular.
              </span>
                </div>
              </div>
            </div>
          </div>

          <div className='col s3 m3 l3'>
            <div className='card-panel grey lighten-5 z-depth-1'>
              <div className='row valign-wrapper'>
                <div className='col s6 m6 l6'>
                  <img
                      src='https://media.takealot.com/covers_tsins/55927403/55927403-1-pdpxl.jpg'
                      alt=''
                      className='circle responsive-img'
                  >
                  </img>
                </div>
                <div className='col s6 m6 l6'>
              <span className='black-text'>
                This is a square image. Add the 'circle' class to it to make it appear circular.
              </span>
                </div>
              </div>
            </div>
          </div>

          <div className='col s3 m3 l3'>
            <div className='card-panel grey lighten-5 z-depth-1'>
              <div className='row valign-wrapper'>
                <div className='col s6 m6 l6'>
                  <img
                      src='https://media.takealot.com/covers_tsins/55927403/55927403-1-pdpxl.jpg'
                      alt=''
                      className='circle responsive-img'
                  >
                  </img>
                </div>
                <div className='col s6 m6 l6'>
              <span className='black-text'>
                This is a square image. Add the 'circle' class to it to make it appear circular.
              </span>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>;
  }
}

export default App;
