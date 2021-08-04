import './PushButton.css';

const PushButton = () => {
	return (
		<button
			id="submitbutton"
			type="button"
			class="btn push-button" //background-scale <removed class, not sure what it does
		>
			<span class="shadow"></span>
			<span class="edge"></span>
			<span class="front">Git Some Data!</span>
		</button>
	);
};

export default PushButton;
