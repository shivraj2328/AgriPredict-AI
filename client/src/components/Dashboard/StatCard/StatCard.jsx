function StatCard({

title,

value,

icon,

color

}){

return(

<div className={`card border-${color} shadow-sm`}>

<div className="card-body">

<h5>{title}</h5>

<h2>{value}</h2>

<div>{icon}</div>

</div>

</div>

);

}

export default StatCard;