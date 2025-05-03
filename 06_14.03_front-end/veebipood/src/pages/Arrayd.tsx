//rfce
function Arrayd() {
    const sonad = ["elas", "metsas", "mutionu"];
    const autod = [
      {"mark": "BMW", "mudel": "i5", "year": 2015},
      {"mark": "BMW", "mudel": "TT", "year": 2015},
      {"mark": "Mercedes", "mudel": "S", "year": 2012},
      {"mark": "vW", "mudel": "golf", "year": 2018}
    ];

    
  return (
    <div> 
      {/* <>
      <div>{7 + 7}</div>
      <div>7 + 7</div>
      <div>{kogus}</div>
      <div>{count}</div>
      </> */}
      {sonad.map(sona => 
        <div key = {sona}>

          {sona}

        </div>
      )}
      <br />
      <br />

      {autod.map(auto =>
        <div key = {auto.mark + auto.mudel}>

          {auto.mark} - {auto.mudel} ({auto.year})

        </div>
      )}
      <br />
      <br />
    </div>
  )
}

export default Arrayd