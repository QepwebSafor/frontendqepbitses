{  if ( selectedOption ===''){
    <p>No hay selección</p>
   
 }
 else {
drawings.map(drawing => (
    <div className="card m-1" key={drawing._id}>
     if  (drawing._id === selectedOption){
           <DrawingItem
           drawing={drawing} />
       }  
    </div>

 ))
}