import { getAll, members } from '../models/members.js';

async function fetchMembers(req, res) {
    res.send(getAll(members));
}

async function fetchMember(req, res) {
    res.send(getAll(members).find(member => member.id === parseInt(req.params.id)));
}

async function createMember(req, res) {
    const newMember = {
        id: members.length + 1,
        name: req.body.name || req.params.name
    };

    members.push(newMember);
    res.status(201).send(newMember);
}

async function updateMemberName(req, res) {
    const { id } = req.params;
    const { name } = req.body;

    const member = getAll(members).find(member => member.id === parseInt(id));
    if (!member) {
        return res.status(404).send({ error: 'Member not found' });
    }

    member.name = name;
    res.send(member);
}

async function deleteMember(req, res) {
    const { id } = req.params;

    const memberIndex = members.findIndex(member => member.id === parseInt(id));
    if (memberIndex === -1) {
        return res.status(404).send({ error: 'Member not found' });
    }

    members.splice(memberIndex, 1);
    res.status(200).send({ message: 'Member deleted' });
}

export { fetchMembers, fetchMember, createMember, updateMemberName, deleteMember };