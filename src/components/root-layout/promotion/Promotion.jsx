"use client";
import Modal from "@/components/shared/modal/Modal";
import React, { useState } from "react";

export default function Promotion() {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
      <h1>For start online business contact us</h1>
    </Modal>
  );
}
