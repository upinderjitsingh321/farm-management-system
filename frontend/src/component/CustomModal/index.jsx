import React from 'react'

function CustomModal({ open, setOpen, children }) {
    return (

        <div class={`modal fade ${open ? "show" : ""}`} id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" style={{ display: `${open ? "block" : "none"}` }}>
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"
                            onClick={() => setOpen(false)}></button>
                    </div>
                    <div class="modal-body-modal">
                        {children}
                    </div>

                </div>
            </div>
        </div>
    )
}

export default CustomModal
