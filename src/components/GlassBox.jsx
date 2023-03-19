import {styled} from "@mui/system";

const GlassBox = styled("div")({
    background: 'rgba(255, 255, 255, 0.25)',
    boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
    backdropFilter: 'blur(5px)',
    WebkitBackdropFilter: 'blur(5px)',
    borderRadius: '10px',
    border: '1px solid rgba(255, 255, 255, 0.18)',
    padding: '25px',
})

export default GlassBox;