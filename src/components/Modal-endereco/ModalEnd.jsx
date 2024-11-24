import { useState, useEffect } from "react";
import styles from "./Modalend.module.css";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Checkbox, Input } from "@nextui-org/react";
import  { useEnderecosInfo } from "../../hooks/api/enderecosApi"

export default function ModalEnd({ endereco, textoBotao, className, isEditando }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [formData, setFormData] = useState({ ...endereco });

  const { cadastrarEndereco } = useEnderecosInfo();

  useEffect(() => {
    if(!isEditando){
      setFormData({
        cep: "",
        rua: "",
        bairro: "",
        cidade: "",
        logradouro: "",
        estado: "",
        numero: "",
        pais: "",
        complemento: "",
        instrucaoEntrega: "",
        enderecoPadrao: false
      })
    }
  }, [])

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const carregarValores = (e) => {
    if(formData.length != 0){
       return e;
    }
  }

  const handleSubmit = async () => {
    if(isEditando){
      try {
        console.log("Submitting data:", formData);
        await updateEndereco(endereco.id, formData);
        alert("Endereço atualizado com sucesso!");
      } catch (error) {
        console.error("Erro ao atualizar endereço:", error);
        alert("Erro ao atualizar endereço.");
      }
    }else{
      try {
        console.log("Submitting data:", formData);
        await cadastrarEndereco(formData);
        alert("Endereço atualizado com sucesso!");
      } catch (error) {
        console.error("Erro ao atualizar endereço:", error);
        alert("Erro ao atualizar endereço.");
      }
    }
    onOpenChange(false);
  };

  return (
    <>
      <Button className={className} onPress={onOpen}>
          {textoBotao}
      </Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="top-center"
        style={{ maxWidth: '600px', width: '90%' }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Editar Endereço</ModalHeader>
              <ModalBody style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
                <div style={{ flex: '1 1 48%', display: 'flex', flexDirection: 'column', padding: '3px' }}>
                  <div style={{display: 'flex', gap: '15px'}}>
                    <Input label="CEP" name="cep" value={carregarValores(formData.cep)} onChange={handleChange} variant="underlined" fullWidth />
                    <Input label="Rua" name="rua" value={carregarValores(formData.rua)} onChange={handleChange} variant="underlined" fullWidth />
                  </div>
                  <div style={{display: 'flex', gap: '15px'}}>
                    <Input label="Bairro" name="bairro" value={carregarValores(formData.bairro)} onChange={handleChange} variant="underlined" fullWidth />
                    <Input label="Cidade" name="cidade" value={carregarValores(formData.cidade)} onChange={handleChange} variant="underlined" fullWidth />
                  </div>
                  <div style={{display: 'flex', gap: '15px'}}>
                    <Input label="Logradouro" name="logradouro" value={carregarValores(formData.logradouro)} onChange={handleChange} variant="underlined" fullWidth />
                    <Input label="Estado" name="estado" value={carregarValores(formData.estado)} onChange={handleChange} variant="underlined" fullWidth />
                  </div>
                  <div style={{display: 'flex', gap: '15px'}}>
                    <Input label="Número" name="numero" value={carregarValores(formData.numero)} onChange={handleChange} variant="underlined" fullWidth />
                    <Input label="País" name="pais" value={carregarValores(formData.pais)} onChange={handleChange} variant="underlined" fullWidth />
                  </div>
                  <div>
                    <Input label="Complemento" name="complemento" value={carregarValores(formData.complemento)} onChange={handleChange} variant="underlined" fullWidth />
                  </div>
                  <div>
                    <Input label="Instruções de entrega" name="instrucaoEntrega" value={carregarValores(formData.instrucaoEntrega)} onChange={handleChange} variant="underlined" fullWidth />
                    <Checkbox name="enderecoPadrao" isSelected={formData.enderecoPadrao} onChange={handleChange} color="danger" className={styles.customCheckbox} style={{padding: '15px'}}>Endereço Padrão</Checkbox>
                  </div>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button className={styles.customButtonTwo} color="danger" variant="flat" onPress={onClose}>
                  Fechar
                </Button>
                <Button className={styles.customButtonTwo} color="primary" onPress={handleSubmit}>
                  Confirmar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
