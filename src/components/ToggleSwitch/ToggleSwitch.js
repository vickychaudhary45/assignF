
import "./ToggleSwitch.scss";

const ToggleSwitch = ({ checked, onChange }) => {
  return (
    <div class="on-off-toggle">
      <input type="checkbox" checked= {checked} onChange={onChange} />
      <label></label>
    </div>
  )
};
export default ToggleSwitch;

