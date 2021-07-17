<template>
	<div id="toolbar">
		<span id="tooltext" class="nunito-reg"><slot></slot></span><unicon name="plus" height="20" fill="limegreen"></unicon>
	</div>
</template>

<script>
	
</script>

<style>
#toolbar {
	position: fixed;
	bottom: 0;
	left: 0;
	width: 84%;
	margin-left: 16%;
	padding-top: 0.5rem;
	padding-bottom: 0.5rem;
	background-color: #F7F7F7;
	box-shadow: 0 0 0.15rem rgba(0, 0, 0, 0.25);
}

#toolbar:hover {
	background-color: #E3E1E1;
}

#tooltext {
	vertical-align: top;
	padding-right: 0.75rem;
	font-size: 1.10rem;
	font-weight: 600;
	color: #0E0562;
	cursor: default;
}


</style>