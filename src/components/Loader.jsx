import "./../styles/loader.css"

const Loader = ({lite=false, coming=false}) => {
    return (
      <div className= {lite ? 'loader-overlay' : coming ? 'c-loader' : 'loader'}>
        {/* <div className= 'spinner'></div> */}
        <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
        {coming && <><br/><br/><p className="c-loader">Coming Soon</p></>}
      </div>
    );
  };
  
  export default Loader;