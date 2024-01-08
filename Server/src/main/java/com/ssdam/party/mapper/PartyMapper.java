package com.ssdam.party.mapper;

import com.ssdam.party.dto.PartyDto;
import com.ssdam.party.entity.Party;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface PartyMapper {
    Party partyPostDtoToParty(PartyDto.Post requestBody);
    Party partyPatchDtoToParty(PartyDto.Patch requestBody);
    PartyDto.Response partyToPartyResponse(Party party);
    List<PartyDto.Response> partiesToPartyResponses(List<Party> parties);

}
