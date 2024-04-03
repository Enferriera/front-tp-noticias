import Button from "react-bootstrap/esm/Button";
import Modal from "react-bootstrap/esm/Modal";

type modalProps = {
    show: boolean;
    onHide: () => void;
    idNoticia: number;
    titulo: string;

}
const EliminarModal = ({ show, onHide, idNoticia, titulo }: modalProps) => {

    const handleClose = () => {
        onHide();
    }
    return (

        <>
        <div className="text-black">
        AQUI ESTOY
        </div>
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Eliminar Noticia
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>

                <p>
                    Esta seguro que quiere eliminar la noticia: {titulo}
                </p>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={onHide}>Close</Button>
                <Button variant="primary" onClick={handleClose}>
                    Eliminar
                </Button>
            </Modal.Footer>
        </Modal>
        </>
    )
}

export default EliminarModal;
