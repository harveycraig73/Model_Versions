

function Measure_OnReset( sender : Demo3D.Visuals.SphereVisual )
{
}

function Measure_OnDragStart( sender : Demo3D.Visuals.SphereVisual )
{
	if (sender.Mode.Value == "Measure" && sender.Spheres == 1){
		sender.Spheres ++;
		sender.OtherSphere = sender.Clone();
		sender.OtherSphere.OtherSphere = sender;
		sender.OtherSphere.Material.Color = System.Drawing.Color.Gold;
		
	}
	else if (sender.Mode.Value == "Position"){
		sender.OtherSphere.Parent = sender;
	}
}

function Measure_OnVisualRemoved( visual : Demo3D.Visuals.Visual )
{
	visual.OtherSphere.Spheres --;
	visual.OtherSphere.Material.Color = System.Drawing.Color.Red;
}

function Measure_OnDragEnd( sender : Demo3D.Visuals.SphereVisual )
{
	if (sender.Mode.Value == "Measure"){
		var v : Vector3 = sender.OtherSphere.Location - sender.Location;
		sender.OffSetVector.X = v.X;
		sender.OffSetVector.Y = v.Y;
		sender.OffSetVector.Z = v.Z;
		sender.Distance = v.Length();
	}
	else if (sender.Mode.Value == "Position"){
		sender.OtherSphere.Reparent(doc.Scene);
	}
	
}

function Measure_9_OnModeUpdated( sender : Demo3D.Visuals.SphereVisual, value : Demo3D.Utilities.CustomEnumeration, oldValue : Demo3D.Utilities.CustomEnumeration )
{
	if (sender.Spheres > 1){
		sender.OtherSphere.Mode = value;
	}
}

function Measure_OnClick( sender : Demo3D.Visuals.SphereVisual, info : Demo3D.Visuals.PickInfo )
{
	var t : Demo3D.Visuals.Note;
	
	if (!NoteExists("Measuring Tool")){
		var NewNote : Demo3D.Visuals.Note = doc.Notes.Add();
		NewNote.Name = "Measuring Tool";
		NewNote.Content = sender.Instructions.Content;
	}
	
}

function NoteExists(noteName : String): boolean{

	for ( var i = 0; i<= doc.Notes.Count - 1;i++ ){
		if (doc.Notes[i].Name == noteName){return true;}
	}	
	return false;
}


