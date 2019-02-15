from models.manager import Manager
from tests.utils import create_evaluation
from utils.logger import logger

def create_evaluations():
    logger.info('create_evaluations')

    evaluations_by_name = {}

    evaluations_by_name["claim / 2"] = create_evaluation(
        "claim",
        info="it describes an observation in a way that is consistent with available data and does not leave out any relevant element of context or it is a theory that has been well tested in scientific studies and generates expected observations that are confirmed by actual observations",
        label="+2 Very High",
        value=2
    )

    evaluations_by_name["claim / 1"] = create_evaluation(
        "claim",
        info="it needs some clarification or additional information to be fully accurate or it presents a theory that is well tested in scientific studies, but its formulation in the claim might overstate the confidence scientists actually have in the theory or slightly distort what can be predicted based on the theory",
        label="+1 High",
        value=1
    )

    evaluations_by_name["claim / 0"] = create_evaluation(
        "claim",
        info="it leaves out important information or is made out of context",
        label="0 Neutral",
        value=0
    )

    evaluations_by_name["claim / -1"] = create_evaluation(
        "claim",
        info="it is made without backing from an adequate reference or the available evidence does not support the statement or it contains an element of truth but leaves the reader with a false understanding of reality",
        label="-1 Low",
        value=-1
    )

    evaluations_by_name["claim / -2"] = create_evaluation(
        "claim",
        info="it is clearly wrong",
        label="-2 Very Low",
        value=-2
    )

    evaluations_by_name["article / 2"] = create_evaluation(
        "article",
        info="no inaccuracies, fairly represents the state of scientific knowledge, well argumented and documented, references are provided for key elements. It provides insights to the reader about climate change mechanisms and implications",
        label="+2 Very High",
        value=2
    )

    evaluations_by_name["article / 1"] = create_evaluation(
        "article",
        info="it does not contain scientific inaccuracies and its conclusion follows from the evidence provided",
        label="+1 High",
        value=1
    )

    evaluations_by_name["article / 0"] = create_evaluation(
        "article",
        info="No major inaccuracies, but no important insight to better explain implications of the science",
        label="0 Neutral",
        value=0
    )

    evaluations_by_name["article / -1"] = create_evaluation(
        "article",
        info="it contains significant scientific inaccuracies or misleading statements",
        label="-1 Low",
        value=-1
    )

    evaluations_by_name["article / -2"] = create_evaluation(
        "article",
        info="it contains major scientific inaccuracies for key facts supporting argumentation, and/or omits important information, and/or presents logical flaws in using information to reach conclusion",
        label="-2 Very Low",
        value=-2
    )

    Manager.check_and_save(*evaluations_by_name.values())

    logger.info('created {} evaluations'.format(len(evaluations_by_name)))

    return evaluations_by_name
