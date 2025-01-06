import { StyledImage, StyledRow } from "./RoomRow";
import Button from "./Button";
import stylePrice from "../stylePrice";
import { IconContext } from "react-icons";
import { LiaLongArrowAltRightSolid } from "react-icons/lia";
import PropTypes from "prop-types";

export default function PickedRoomRow({room}){
    const styledPrice = stylePrice(room.price);
    const styledDiscountedPrice = stylePrice(room.price - room.discount);
    return (
    <StyledRow key={room.number}>
            <td><StyledImage src={room.image} alt="room" /></td>
            <td>{room.number}</td>
            <td>{room.capacity}</td>
            <td>
                    {/* the helper div is for centering vertically */}
                    <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        alignContent: "center",
                    }}
                    >
                    {room.discount ? (
                        <>
                        <del>{styledPrice}</del>
                        <IconContext.Provider value={{ color: "red", size: " 1.7em" }}>
                            <LiaLongArrowAltRightSolid />
                            {styledDiscountedPrice}
                        </IconContext.Provider>
                        </>
                    ) : (
                        styledPrice
                    )}
                    </div>
                </td>
            <td><Button>Remove</Button></td>
        </StyledRow>
    )
                    
}

PickedRoomRow.propTypes = {
    room: PropTypes.object,
}