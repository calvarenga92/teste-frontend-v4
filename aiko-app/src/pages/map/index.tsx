import { useEffect, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import L from 'leaflet';
import logoAiko from "../../images/aiko.png";
import {
    Finder,
    Wrapper,
    InfoMap,
    MenuEquip,
    Card,
    ModalTable,
    SubCard,
    WrapperMenu,
    Title,
    Search,
    Select,
    ModalPosition
} from "./style";
import equipmentsData from '../../data/equipment.json';
import equipmentPositionHistory from '../../data/equipmentPositionHistory.json';
import equipmentStateHistory from '../../data/equipmentStateHistory.json';
import equipmentState from '../../data/equipmentState.json';
import Modal from "../../components/Modal";

interface EquipamentInterface { 
  id: string, 
  equipmentModelId: string,
  name: string,
}

const MapUpdater = ({ center }:any) => {
  const map = useMap();
  useEffect(() => {
    map.setView(center);
  }, [center, map]);
  return null;
};

const Map = () => {
  const [center, setCenter] = useState([0,0]);
  const [screenItem, setScreenItem] = useState([{date: '', lat: 0, lon: 0}]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [nameCompany, setNameCompany] = useState('');
  const [equipmentModelId, setEquipmentModelId] = useState('');
  const [filteredItens, setFilteredItens] = useState<EquipamentInterface[]>(equipmentsData);
  const [estableFilteredItens, setEstableFilteredItens] = useState<EquipamentInterface[]>(equipmentsData);
  const [selectedStateFilter, setSelectedStateFilter] = useState<string>('');
  const [termSearch, setTermSearch] = useState('');

  const historyPosition = (item:any) => {
    const filter = equipmentPositionHistory.filter(el => el.equipmentId === item.id);
    setScreenItem(filter[0].positions);
    setEquipmentModelId(item.equipmentModelId);
    setNameCompany(item.name);
    handleOpenModal();
  }
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    findEquipament(equipmentsData[0]);
  }, [])

  const findEquipament = (elem: any) => {
    const filter = equipmentPositionHistory.filter(el => el.equipmentId === elem.id);
    setEquipmentModelId(elem.equipmentModelId);
    const data = filter[0].positions.slice().sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0];
    setCenter([
      data.lat,
      data.lon,
    ]);
  }

const NormalizeData = (dataReceived:any) => {
  let dataISOString = dataReceived;
  let data = new Date(dataISOString);
  let dia = String(data.getDate()).padStart(2, '0');
  let mes = String(data.getMonth() + 1).padStart(2, '0');
  let ano = data.getFullYear();
  let horas = String(data.getHours()).padStart(2, '0');
  let minutos = String(data.getMinutes()).padStart(2, '0');
  let segundos = String(data.getSeconds()).padStart(2, '0');
  let dataFormatada = `${dia}/${mes}/${ano} ${horas}:${minutos}:${segundos}`;
  return dataFormatada;
}

const retinaVerify = () => {
  if (equipmentModelId) {
    if (equipmentModelId === "a3540227-2f0e-4362-9517-92f41dabbfdf") return require('../../images/caminhao.png');
    if (equipmentModelId === "a4b0c114-acd8-4151-9449-7d12ab9bf40f") return require('../../images/harvester.png');
    if (equipmentModelId === "9c3d009e-0d42-4a6e-9036-193e9bca3199") return require('../../images/garra.png');
  }
  return true;
}

  const iconPerson = new L.Icon({
    iconUrl: retinaVerify(),
    iconRetinaUrl: retinaVerify(),
    iconSize: new L.Point(60, 75),
    className: 'leaflet-div-icon'
  });

  const filterEquipaments = (serching:string) => {
    setTermSearch(serching);
    if (selectedStateFilter === "") {
      const newArray = equipmentsData.filter(item => JSON.stringify(item).toLowerCase().includes(serching.toLowerCase()));
      setFilteredItens(newArray);
    } else {
      const newArray = estableFilteredItens.filter(item => JSON.stringify(item).toLowerCase().includes(serching.toLowerCase()));
      setFilteredItens(newArray);
    }
  }

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setTermSearch('');
    setSelectedStateFilter(event.target.value);
    const arrayEstable = equipmentsData;
    const newArray = arrayEstable.filter(item => JSON.stringify(item).toLowerCase().includes(event.target.value.toLowerCase()));
    setEstableFilteredItens(newArray);
    setFilteredItens(newArray);
  };

  return(
      <Wrapper>
        <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
          <h2>Histórico de localização do equipamento {nameCompany} </h2>
          <ModalTable>
          {screenItem.map(el => (
            <ModalPosition>
              <span>Clique para ver no mapa</span>
              <button onClick={() => {
                setCenter([
                  el.lat,
                  el.lon,
                ]);
                handleCloseModal();
              }}>{NormalizeData(el.date)}</button>
            </ModalPosition>
          ))}
          </ModalTable>
        </Modal>
        <Finder>
          <img src={logoAiko} alt='aiko-logo'/>
          <div>
            <Title>Posição atual dos equipamentos</Title>
            <Search placeholder="Pesquise por nome ou ID" value={termSearch} onChange={(ev) => filterEquipaments(ev.target.value)}/>
            
            <Select id="lang" onChange={handleSelectChange} value={selectedStateFilter}>
              <option value="">Todos os modelos</option>
              <option value="a3540227-2f0e-4362-9517-92f41dabbfdf">Caminhão de carga</option>
              <option value="a4b0c114-acd8-4151-9449-7d12ab9bf40f">Harvester</option>
              <option value="9c3d009e-0d42-4a6e-9036-193e9bca3199">Garra traçadora</option>
            </Select>
            
            <WrapperMenu>
              {filteredItens.map((el) => {
                const filter = equipmentStateHistory.filter(item => item.equipmentId === el.id);
                const data = filter[0].states.slice().sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0];
                const stateColor = equipmentState.filter(el => el.id === data.equipmentStateId)[0].color;
                const stateName = equipmentState.filter(el => el.id === data.equipmentStateId)[0].name;
                return (
                  <MenuEquip>
                    <Card>
                      <span>{el.name}</span>
                      <span style={{ color: stateColor }}>{stateName}</span>
                    </Card>
                    <SubCard>
                      <button onClick={() => findEquipament(el)}>ver no mapa</button>
                      <button onClick={() => historyPosition(el)}>histórico</button>
                    </SubCard>
                  </MenuEquip>
                )
              })}
            </WrapperMenu>
          </div>
        </Finder>
        <MapContainer
          center={[center[0], center[1]]}
          zoom={12}
          style={{ height: '100vh', width: '100%', zIndex: 0}}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            
          <MapUpdater center={[center[0], center[1]]}   />
          <Marker position={[center[0], center[1]]} key={`${[center[0], center[1]]}`} icon={iconPerson}>
            <Popup>
              <InfoMap>
                <span>Posição exata no mapa do equipamento </span>
                <span>Latitude: {[center[0]]}</span>
                <span>Logitude: {[center[1]]}</span>

              </InfoMap>
              
            </Popup>
          </Marker>
        </MapContainer> 
      </Wrapper>
  );
}

export default Map;