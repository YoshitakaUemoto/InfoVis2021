class Vec3{
    constructor(x,y,z){
	this.x = x;
	this.y = y;
	this.z = z;
    }
    min(){
	if(x<=y)
	{
	    if(x<=z)
	    {
		return x;
	    }
	    else
	    {
		return z;
	    }
	}
	else
	{
	    if(y<=z)
	    {
		return y;
	    }
	    else
	    {
		return z;
	    }
	}
    }
    max(){
	if(x>=y)
	{
	    if(x>=z)
	    {
		return x;
	    }
	    else
	    {
		return z;
	    }
	}
	else
	{
	    if(y>=z)
	    {
		return y;
	    }
	    else
	    {
		return z;
	    }
	}
    }
    mid()
    {
	if(x>=y)
	{
	    if(x>=z)
	    {
		if(y>=z)
		{
		    return y;
		}
		else{
		    return z;
		}
	    }
	    else{
		return v.x;
	    }
	}
	else{
	    if(y>=z)
	    {
		if(x>=z)
		{
		    return x;
		}
		else{
		    return z;
		}
	    }
	    else{
		return y;
	    }
	}
    }
}
	
